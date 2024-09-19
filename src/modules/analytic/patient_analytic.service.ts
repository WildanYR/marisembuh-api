import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { QueryTypes } from 'sequelize';
import {
  MYSQL_PROVIDER,
  PAGINATION_DEFAULT_LIMIT,
  RM_PREFIX,
} from 'src/constants/database.const';
import {
  PATIENT_REPOSITORY,
  TREATMENT_REPOSITORY,
} from 'src/constants/repository.const';
import { MysqlProvider } from 'src/database/mysql.provider';
import { Patient } from 'src/entities/patient.entity';
import { Treatment } from 'src/entities/treatment.entity';
import { IDateFilter } from 'src/types/date_filter.type';
import { IPagination } from 'src/types/pagination.type';
import { DateUtility } from 'src/utils/date.util';
import { PaginationUtility } from 'src/utils/pagination.util';

@Injectable()
export class PatientAnalyticService {
  constructor(
    private paginationUtility: PaginationUtility,
    private dateUtility: DateUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    @Inject(PATIENT_REPOSITORY) private patientRepository: typeof Patient,
    @Inject(TREATMENT_REPOSITORY) private treatmentRepository: typeof Treatment,
  ) {}

  async getPatientAnalyticPagination(
    pagination: IPagination,
    dateFilter: IDateFilter,
    sort?: string,
  ) {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    let sql = `SELECT p.id AS id, p.name AS name, CASE WHEN COUNT(pr.id) > 1 THEN 'Lama' ELSE 'Baru' END AS patient_status, COUNT(pr.id) AS total_treatment, MAX(pr.created_at) AS last_treatment_date FROM patient p LEFT JOIN treatment pr ON p.id = pr.patient_id AND pr.created_at BETWEEN :start_date AND :end_date GROUP BY p.id, p.name`;

    if (sort) {
      sql += ` ORDER BY ${sort.replace('|', ' ')}`;
    }

    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const patientCount = await this.patientRepository.count();

    const response = await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
      },
    });

    const patientAnalytic = response.map((patient: any) => {
      const no_rm = RM_PREFIX + patient.id.toString().padStart(6, '0');

      return {
        ...patient,
        no_rm,
      };
    });

    return this.paginationUtility.paginationResponse(
      pagination,
      patientAnalytic,
      patientCount,
    );
  }

  async getPatientAnalyticByName(search: string, dateFilter: IDateFilter) {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);

    let sql = `SELECT p.id, p.name, CASE WHEN COUNT(pr.id) > 1 THEN 'Lama' ELSE 'Baru' END AS patient_status, COUNT(pr.id) AS total_treatment, MAX(pr.created_at) AS last_treatment_date FROM patient p LEFT JOIN treatment pr ON p.id = pr.patient_id AND pr.created_at BETWEEN :start_date AND :end_date WHERE p.name LIKE :name GROUP BY p.id, p.name ORDER BY last_treatment_date DESC`;

    const response = await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        name: `%${search}%`,
      },
    });

    return response.map((patient: any) => {
      const no_rm = RM_PREFIX + patient.id.toString().padStart(6, '0');

      return {
        ...patient,
        no_rm,
      };
    });
  }

  async getPatientAnalyticSummary(dateFilter: IDateFilter) {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);

    const patientCount = await this.patientRepository.count({
      where: {
        created_at: {
          [Op.between]: [dateRange.startOfDate, dateRange.endOfDate],
        },
      },
    });

    const treatmentCount = await this.treatmentRepository.count({
      where: {
        created_at: {
          [Op.between]: [dateRange.startOfDate, dateRange.endOfDate],
        },
      },
    });

    return {
      new_patient: patientCount,
      total_treatment: treatmentCount,
    };
  }
}
