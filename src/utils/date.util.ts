import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { IDateFilter } from 'src/types/date_filter.type';

@Injectable()
export class DateUtility {
  formatLocaleString(date: Date) {
    return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd HH:mm:ss ZZ');
  }

  getNow() {
    return DateTime.now().toJSDate();
  }

  getStartEndOfDay(date?: Date) {
    let today: DateTime;
    if (date) {
      today = DateTime.fromJSDate(date);
    } else {
      today = DateTime.now();
    }
    return {
      startOfDay: today.startOf('day').toJSDate(),
      endOfDay: today.endOf('day').toJSDate(),
    };
  }

  dateFilterToDateRange(dateFilter?: IDateFilter) {
    let startOfDate: DateTime;
    let endOfDate: DateTime;

    if (dateFilter.start_date) {
      startOfDate = DateTime.fromISO(dateFilter.start_date);
    } else {
      startOfDate = DateTime.now().startOf('month');
    }

    if (
      dateFilter.end_date &&
      DateTime.fromISO(dateFilter.end_date) <= DateTime.now().endOf('day')
    ) {
      endOfDate = DateTime.fromISO(dateFilter.end_date);
    } else {
      endOfDate = DateTime.now().endOf('month');
    }

    return {
      startOfDate: startOfDate.startOf('day').toJSDate(),
      endOfDate: endOfDate.endOf('day').toJSDate(),
    };
  }
}
