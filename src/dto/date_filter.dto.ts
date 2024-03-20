import { IsDateString, IsOptional } from 'class-validator';
import { IDateFilter } from 'src/types/date_filter.type';

export class DateFilterDTO implements IDateFilter {
  @IsOptional()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date: string;
}
