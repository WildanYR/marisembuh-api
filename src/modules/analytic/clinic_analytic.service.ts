import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { MYSQL_PROVIDER } from 'src/constants';
import { MysqlProvider } from 'src/database/mysql.provider';
import { DateUtility } from 'src/utils/date.util';
import { IClinicAnalyticResponse } from './types/clinic_analytic_response.type';

@Injectable()
export class ClinicAnalyticService {
  constructor(
    private dateUtility: DateUtility,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
  ) {}

  async getClinicAnalytic(date?: string): Promise<IClinicAnalyticResponse[]> {
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
    return response as IClinicAnalyticResponse[];
  }

  async getUserAnalytic(date?: string) {
    const sql =
      'SELECT id, name, COALESCE(today_patient, 0) as today_patient, COALESCE(month_patient, 0) as month_patient FROM user AS c LEFT JOIN (SELECT user_id AS t_id, COUNT(user_id) AS today_patient FROM treatment AS j WHERE j.created_at BETWEEN ? AND ? GROUP BY user_id) AS t ON t.t_id = c.id LEFT JOIN (SELECT user_id AS m_id, COUNT(user_id) AS month_patient FROM treatment AS j WHERE j.created_at BETWEEN ? AND ? GROUP BY user_id) AS m ON m.m_id = c.id';
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
