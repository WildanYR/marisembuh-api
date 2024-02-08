import { Injectable } from '@nestjs/common';

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
}
