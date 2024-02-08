import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import {
  CLINIC_REPOSITORY,
  MYSQL_PROVIDER,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants';
import { Clinic } from 'src/entities/clinic.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateClinic } from './types/create_clinic.type';
import { IUpdateClinic } from './types/update_clinic.type';
import { MysqlProvider } from 'src/database/mysql.provider';
import { DateUtility } from 'src/utils/date.util';

@Injectable()
export class ClinicService {
  constructor(
    private paginationUtility: PaginationUtility,
    private dateUtility: DateUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    @Inject(CLINIC_REPOSITORY) private clinicRepository: typeof Clinic,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<Clinic>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const clinics = await this.clinicRepository.findAndCountAll({
      offset,
      limit,
    });
    return this.paginationUtility.paginationResponse(
      pagination,
      clinics.rows,
      clinics.count,
    );
  }

  async findById(clinicId: number): Promise<Clinic> {
    return await this.clinicRepository.findOne({
      where: { id: clinicId },
    });
  }

  async findAllByName(name: string): Promise<Clinic[]> {
    return await this.clinicRepository.findAll({
      where: { name: { [Op.substring]: name } },
    });
  }

  async create(createClinicDTO: ICreateClinic): Promise<Clinic> {
    return await this.clinicRepository.create(createClinicDTO as any);
  }

  async update(
    clinicId: number,
    updateClinicDTO: IUpdateClinic,
  ): Promise<Clinic> {
    const clinic = await this.clinicRepository.findOne({
      where: { id: clinicId },
    });
    if (!clinic) {
      throw new NotFoundException(`Clinic with id ${clinicId} not found`);
    }
    clinic.set(updateClinicDTO);
    await clinic.save();
    return clinic;
  }

  async destroy(clinicId: number): Promise<void> {
    const clinic = await this.clinicRepository.findOne({
      where: { id: clinicId },
    });
    if (!clinic) {
      throw new NotFoundException(`Clinic with id ${clinicId} not found`);
    }
    await clinic.destroy();
  }

  async getStatistics(date?: string) {
    const sql =
      'SELECT id, name, COALESCE(today_patient, 0) as today_patient, COALESCE(month_patient, 0) as month_patient FROM clinic AS c LEFT JOIN (SELECT clinic_id AS t_id, COUNT(clinic_id) AS today_patient FROM treatment AS j WHERE j.created_at BETWEEN ? AND ? GROUP BY clinic_id) AS t ON t.t_id = c.id LEFT JOIN (SELECT clinic_id AS m_id, COUNT(clinic_id) AS month_patient FROM treatment AS j WHERE j.created_at BETWEEN ? AND ? GROUP BY clinic_id) AS m ON m.m_id = c.id';
    const todayDate = date ? new Date(date) : new Date();
    const nowDateStr = this.dateUtility.formatLocaleString(todayDate);
    todayDate.setHours(0, 0, 0, 0);
    const todayDateStr = this.dateUtility.formatLocaleString(todayDate);
    todayDate.setDate(1);
    const monthDateStr = this.dateUtility.formatLocaleString(todayDate);
    const response = await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: [todayDateStr, nowDateStr, monthDateStr, nowDateStr],
    });
    return response;
  }
}
