import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import {
  MYSQL_PROVIDER,
  PAGINATION_DEFAULT_LIMIT,
  THERAPY_REPOSITORY,
} from 'src/constants';
import { IDateFilter } from 'src/types/date_filter.type';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { ITotalatientAnalyticResponse } from './types/total_patient_analytic_response.type';
import { MysqlProvider } from 'src/database/mysql.provider';
import { Therapy } from 'src/entities/therapy.entity';
import { DateUtility } from 'src/utils/date.util';
import { PaginationUtility } from 'src/utils/pagination.util';

@Injectable()
export class TotalPatientAnalyticService {
  constructor(
    private paginationUtility: PaginationUtility,
    private dateUtility: DateUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    @Inject(THERAPY_REPOSITORY) private therapyRepository: typeof Therapy,
  ) {}

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
}
