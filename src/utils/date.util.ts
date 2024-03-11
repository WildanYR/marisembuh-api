import { Injectable } from '@nestjs/common';
import { IDateFilter } from 'src/types/date_filter.type';

@Injectable()
export class DateUtility {
  formatLocaleString(date: Date) {
    const dateStr = date
      .toLocaleDateString('id-id')
      .split('/')
      .reverse()
      .join('-');
    const timeStr = date.toLocaleTimeString('id-id').replaceAll('.', ':');
    return `${dateStr} ${timeStr}`;
  }

  dateFilterToDateRange(dateFilter?: IDateFilter) {
    let startOfDate: Date;
    let endOfDate: Date;

    if (dateFilter.start_date) {
      startOfDate = new Date(dateFilter.start_date);
    } else {
      startOfDate = new Date();
      startOfDate.setDate(1);
    }

    if (
      dateFilter.end_date &&
      dateFilter.end_date.getTime() <= new Date().getTime()
    ) {
      endOfDate = new Date(dateFilter.end_date);
    } else {
      endOfDate = new Date();
    }

    startOfDate.setHours(0, 0, 0, 1);
    endOfDate.setHours(23, 59, 59, 999);

    return {
      startOfDate,
      endOfDate,
    };
  }
}
