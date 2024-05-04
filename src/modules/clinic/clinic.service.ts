import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Clinic } from 'src/entities/clinic.entity';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { ICreateClinic } from './types/create_clinic.type';
import { IUpdateClinic } from './types/update_clinic.type';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants/database.const';
import { CLINIC_REPOSITORY } from 'src/constants/repository.const';

@Injectable()
export class ClinicService {
  constructor(
    private paginationUtility: PaginationUtility,
    @Inject(CLINIC_REPOSITORY) private clinicRepository: typeof Clinic,
  ) {}

  async getAllWithPagination(
    pagination: IPagination,
  ): Promise<IPaginationResponse<Clinic>> {
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const clinics = await this.clinicRepository.findAndCountAll({
      order: [['id', 'desc']],
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
      order: [['id', 'desc']],
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
}
