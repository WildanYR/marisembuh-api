import { Inject, Injectable } from '@nestjs/common';
import { IDateFilter } from '../../types/date_filter.type';
import { QueryTypes } from 'sequelize';
import { MysqlProvider } from 'src/database/mysql.provider';
import { DateUtility } from 'src/utils/date.util';
import {
  IAbsenceAnalyticDbResponse,
  IAbsenceAnalyticResponse,
} from './types/absence_analytic_response.type';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';
import { PaginationUtility } from 'src/utils/pagination.util';
import { User } from 'src/entities/user.entity';
import { Absence } from 'src/entities/absence.entity';
import { Op } from 'sequelize';
import { Setting } from 'src/entities/setting.entity';
import {
  MYSQL_PROVIDER,
  PAGINATION_DEFAULT_LIMIT,
} from 'src/constants/database.const';
import {
  USER_REPOSITORY,
  ABSENCE_REPOSITORY,
  SETTING_REPOSITORY,
} from 'src/constants/repository.const';
import {
  ABSENCE_LATE_HOUR_SETTING,
  ABSENCE_LATE_HOUR_DEFAULT,
} from 'src/constants/setting.const';

@Injectable()
export class AbsenceAnalyticService {
  constructor(
    private paginationUtility: PaginationUtility,
    private dateUtility: DateUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    @Inject(ABSENCE_REPOSITORY) private absenceRepository: typeof Absence,
    @Inject(SETTING_REPOSITORY) private settingRepository: typeof Setting,
  ) {}

  async getAbsenceAnalyticPagination(
    pagination: IPagination,
    dateFilter: IDateFilter,
    clinicId?: number,
  ): Promise<IPaginationResponse<IAbsenceAnalyticResponse>> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);

    let sql =
      'SELECT u.id AS id, u.name AS `name`, COALESCE(can.absence_count, 0) AS `normal`, COALESCE(cal.absence_count, 0) AS `late` FROM user u LEFT JOIN ( SELECT uan.id, COUNT(an.id) AS `absence_count` FROM user uan LEFT JOIN absence an ON uan.id = an.user_id WHERE an.created_at BETWEEN :start_date AND :end_date GROUP BY uan.id ) can ON u.id = can.id LEFT JOIN ( SELECT ual.id, COUNT(al.id) AS `absence_count` FROM user ual LEFT JOIN absence al ON ual.id = al.user_id WHERE al.created_at BETWEEN :start_date AND :end_date AND TIME(al.created_at) > :late_time GROUP BY ual.id ) cal ON u.id = cal.id ORDER BY u.id DESC';

    const condition = [];

    if (clinicId) {
      condition.push('u.clinic_id = :clinic_id');
    }
    if (condition.length) {
      sql += ' WHERE' + condition.join(' AND ');
    }

    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const absenceLateSettingDb = await this.settingRepository.findOne({
      where: { name: ABSENCE_LATE_HOUR_SETTING },
    });
    const absenceLate = absenceLateSettingDb
      ? absenceLateSettingDb.value
      : ABSENCE_LATE_HOUR_DEFAULT;

    const userCount = await this.userRepository.count();

    const response = (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        late_time: absenceLate,
        clinic_id: clinicId,
      },
    })) as IAbsenceAnalyticDbResponse[];

    const userAbsence = response.map((absence) => {
      const subtNumber = Math.ceil(
        Math.abs(
          dateRange.endOfDate.getTime() - dateRange.startOfDate.getTime(),
        ) /
          (1000 * 60 * 60 * 24),
      );
      return {
        id: absence.id,
        name: absence.name,
        total: absence.normal,
        late: absence.late,
        absent: subtNumber - absence.normal,
      };
    });

    return this.paginationUtility.paginationResponse(
      pagination,
      userAbsence,
      userCount,
    );
  }

  async getAbsenceAnalyticByName(
    search: string,
    dateFilter?: IDateFilter,
  ): Promise<IAbsenceAnalyticResponse[]> {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);

    let sql =
      'SELECT u.id AS id, u.name AS `name`, COALESCE(can.absence_count, 0) AS `normal`, COALESCE(cal.absence_count, 0) AS `late` FROM user u LEFT JOIN ( SELECT uan.id, COUNT(an.id) AS `absence_count` FROM user uan LEFT JOIN absence an ON uan.id = an.user_id WHERE an.created_at BETWEEN :start_date AND :end_date GROUP BY uan.id ) can ON u.id = can.id LEFT JOIN ( SELECT ual.id, COUNT(al.id) AS `absence_count` FROM user ual LEFT JOIN absence al ON ual.id = al.user_id WHERE al.created_at BETWEEN :start_date AND :end_date AND TIME(al.created_at) > :late_time GROUP BY ual.id ) cal ON u.id = cal.id WHERE u.name LIKE :name ORDER BY u.id DESC';

    const absenceLateSettingDb = await this.settingRepository.findOne({
      where: { name: ABSENCE_LATE_HOUR_SETTING },
    });
    const absenceLate = absenceLateSettingDb
      ? absenceLateSettingDb.value
      : ABSENCE_LATE_HOUR_DEFAULT;

    const response = (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        late_time: absenceLate,
        name: `%${search}%`,
      },
    })) as IAbsenceAnalyticDbResponse[];

    return response.map((absence) => {
      const subtNumber = Math.ceil(
        Math.abs(
          dateRange.endOfDate.getTime() - dateRange.startOfDate.getTime(),
        ) /
          (1000 * 60 * 60 * 24),
      );
      return {
        id: absence.id,
        name: absence.name,
        total: absence.normal,
        late: absence.late,
        absent: subtNumber - absence.normal,
      };
    });
  }

  async getAbsenceAnalyticDetail(
    pagination: IPagination,
    userId: number,
    dateFilter?: IDateFilter,
  ) {
    const dateRange = this.dateUtility.dateFilterToDateRange(dateFilter);
    const offset = this.paginationUtility.calculateOffset(pagination);
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;

    let sql =
      'SELECT u.id AS id, u.name AS `name`, COALESCE(can.absence_count, 0) AS `normal`, COALESCE(cal.absence_count, 0) AS `late` FROM user u LEFT JOIN ( SELECT uan.id, COUNT(an.id) AS `absence_count` FROM user uan LEFT JOIN absence an ON uan.id = an.user_id WHERE an.created_at BETWEEN :start_date AND :end_date GROUP BY uan.id ) can ON u.id = can.id LEFT JOIN ( SELECT ual.id, COUNT(al.id) AS `absence_count` FROM user ual LEFT JOIN absence al ON ual.id = al.user_id WHERE al.created_at BETWEEN :start_date AND :end_date AND TIME(al.created_at) > :late_time GROUP BY ual.id ) cal ON u.id = cal.id WHERE u.id = :user_id LIMIT 1';

    const absenceLateSettingDb = await this.settingRepository.findOne({
      where: { name: ABSENCE_LATE_HOUR_SETTING },
    });
    const absenceLate = absenceLateSettingDb
      ? absenceLateSettingDb.value
      : ABSENCE_LATE_HOUR_DEFAULT;

    const response = (await this.mysqlProvider.rawQuery(sql, {
      type: QueryTypes.SELECT,
      replacements: {
        start_date: this.dateUtility.formatLocaleString(dateRange.startOfDate),
        end_date: this.dateUtility.formatLocaleString(dateRange.endOfDate),
        late_time: absenceLate,
        user_id: userId,
      },
    })) as IAbsenceAnalyticDbResponse[];

    const absenceSummary = response.map((absence) => {
      const subtNumber = Math.ceil(
        Math.abs(
          dateRange.endOfDate.getTime() - dateRange.startOfDate.getTime(),
        ) /
          (1000 * 60 * 60 * 24),
      );
      return {
        id: absence.id,
        name: absence.name,
        total: absence.normal,
        late: absence.late,
        absent: subtNumber - absence.normal,
      };
    });

    const absences = await this.absenceRepository.findAndCountAll({
      where: {
        user_id: userId,
        created_at: {
          [Op.between]: [dateRange.startOfDate, dateRange.endOfDate],
        },
      },
      order: [['id', 'desc']],
      offset,
      limit,
    });

    const paginationResult = this.paginationUtility.paginationResponse(
      pagination,
      absences.rows,
      absences.count,
    );

    return {
      lateHour: absenceLate,
      summary: absenceSummary.length ? absenceSummary[0] : null,
      pagination: paginationResult,
    };
  }
}
