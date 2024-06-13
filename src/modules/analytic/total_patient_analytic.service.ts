import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { IDateFilter } from 'src/types/date_filter.type';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { ITotalatientAnalyticResponse } from './types/total_patient_analytic_response.type';
import { MysqlProvider } from 'src/database/mysql.provider';
import { Therapy } from 'src/entities/therapy.entity';
import { DateUtility } from 'src/utils/date.util';
import { PaginationUtility } from 'src/utils/pagination.util';
import { Clinic } from 'src/entities/clinic.entity';
import { User } from 'src/entities/user.entity';
import {
  MYSQL_PROVIDER,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants/database.const';
import {
  CLINIC_REPOSITORY,
  THERAPY_REPOSITORY,
  TREATMENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/constants/repository.const';
import { Treatment } from 'src/entities/treatment.entity';
import { Op } from 'sequelize';

@Injectable()
export class TotalPatientAnalyticService {
  constructor(
    private paginationUtility: PaginationUtility,
    private dateUtility: DateUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    @Inject(CLINIC_REPOSITORY) private clinicRepository: typeof Clinic,
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    @Inject(THERAPY_REPOSITORY) private therapyRepository: typeof Therapy,
    @Inject(TREATMENT_REPOSITORY) private treatmentRepository: typeof Treatment,
  ) {}

  async getClinicAnalyticPagination(
    pagination?: IPagination,
    dateFilter?: IDateFilter,
  ): Promise<IPaginationResponse<ITotalatientAnalyticResponse>> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    let sql =
      'SELECT c.id as id, c.name as name, COALESCE(t.total_patient, 0) as total_patient FROM clinic c LEFT JOIN ( SELECT jt.clinic_id AS clinic_id, COUNT(jt.clinic_id) AS total_patient FROM treatment jt WHERE jt.created_at BETWEEN :start_date AND :end_date GROUP BY clinic_id ) AS t ON t.clinic_id = c.id ORDER BY total_patient DESC LIMIT :limit OFFSET :offset';

    const clinicCount = await this.clinicRepository.count();

    const response = (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        limit,
        offset,
      },
    })) as ITotalatientAnalyticResponse[];

    return this.paginationUtility.paginationResponse(
      pagination,
      response,
      clinicCount,
    );
  }

  async getClinicAnalyticByName(
    name: string,
    dateFilter?: IDateFilter,
  ): Promise<ITotalatientAnalyticResponse[]> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    let sql =
      'SELECT c.id as id, c.name as name, COALESCE(t.total_patient, 0) as total_patient FROM clinic c LEFT JOIN ( SELECT jt.clinic_id AS clinic_id, COUNT(jt.id) AS total_patient FROM treatment jt WHERE jt.created_at BETWEEN :start_date AND :end_date GROUP BY clinic_id ) AS t ON t.clinic_id = c.id ORDER BY total_patient DESC WHERE c.name LIKE :name';

    return (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        name: `%${name}%`,
      },
    })) as ITotalatientAnalyticResponse[];
  }

  async getUserAnalyticPagination(
    pagination?: IPagination,
    dateFilter?: IDateFilter,
  ): Promise<IPaginationResponse<ITotalatientAnalyticResponse>> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    let sql =
      'SELECT u.id as id, u.name as name, COALESCE(t.total_patient, 0) as total_patient FROM user u LEFT JOIN ( SELECT jt.user_id AS user_id, COUNT(jt.id) AS total_patient FROM treatment jt WHERE jt.created_at BETWEEN :start_date AND :end_date GROUP BY user_id ) AS t ON t.user_id = u.id ORDER BY total_patient DESC LIMIT :limit OFFSET :offset';

    const userCount = await this.userRepository.count();

    const response = (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        limit,
        offset,
      },
    })) as ITotalatientAnalyticResponse[];

    return this.paginationUtility.paginationResponse(
      pagination,
      response,
      userCount,
    );
  }

  async getUserAnalyticByName(
    name: string,
    dateFilter?: IDateFilter,
  ): Promise<ITotalatientAnalyticResponse[]> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    let sql =
      'SELECT u.id as id, u.name as name, COALESCE(t.total_patient, 0) as total_patient FROM user u LEFT JOIN ( SELECT jt.user_id AS user_id, COUNT(jt.id) AS total_patient FROM treatment jt WHERE jt.created_at BETWEEN :start_date AND :end_date GROUP BY user_id ) AS t ON t.user_id = u.id ORDER BY total_patient DESC WHERE u.name LIKE :name';

    return (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        name: `%${name}%`,
      },
    })) as ITotalatientAnalyticResponse[];
  }

  async getTherapyAnalyticPagination(
    pagination?: IPagination,
    dateFilter?: IDateFilter,
  ): Promise<IPaginationResponse<ITotalatientAnalyticResponse>> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    let sql =
      'SELECT th.id as id, th.name as name, COALESCE(j.total_patient, 0) as total_patient FROM therapy th LEFT JOIN ( SELECT tth.therapy_id as therapy_id, COUNT(tth.id) as total_patient FROM treatment_therapy tth INNER JOIN treatment t ON tth.treatment_id = t.id AND (t.created_at BETWEEN :start_date AND :end_date) GROUP BY therapy_id ) j ON j.therapy_id = th.id ORDER BY total_patient DESC LIMIT :limit OFFSET :offset';

    const therapyCount = await this.therapyRepository.count();

    const response = (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        limit,
        offset,
      },
    })) as ITotalatientAnalyticResponse[];

    return this.paginationUtility.paginationResponse(
      pagination,
      response,
      therapyCount,
    );
  }

  async getTherapyAnalyticByName(
    name: string,
    dateFilter?: IDateFilter,
  ): Promise<ITotalatientAnalyticResponse[]> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    let sql =
      'SELECT th.id as id, th.name as name, COALESCE(j.total_patient, 0) as total_patient FROM therapy th LEFT JOIN ( SELECT tth.therapy_id as therapy_id, COUNT(tth.therapy_id) as total_patient FROM treatment_therapy tth INNER JOIN treatment t ON tth.treatment_id = t.id AND (t.created_at BETWEEN :start_date AND :end_date) GROUP BY therapy_id ) j ON j.therapy_id = th.id WHERE th.name LIKE :name ORDER BY total_patient DESC';

    return (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        name: `%${name}%`,
      },
    })) as ITotalatientAnalyticResponse[];
  }

  async getHomecareAnalytic(
    dateFilter?: IDateFilter,
  ): Promise<ITotalatientAnalyticResponse[]> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);

    const homecareCount = await this.treatmentRepository.count({
      where: {
        clinic_id: { [Op.is]: null },
        created_at: {
          [Op.between]: [
            this.dateUtility.formatLocaleString(dateRange.startOfDate),
            this.dateUtility.formatLocaleString(dateRange.endOfDate),
          ],
        },
      },
    });

    return [
      {
        id: 1,
        name: 'Homecare',
        total_patient: homecareCount,
      },
    ];
  }
}
