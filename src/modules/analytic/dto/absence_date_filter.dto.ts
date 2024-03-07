import { IsDateString, IsOptional } from 'class-validator';
import { IAbsenceDateFilter } from '../types/absence_date_filter.type';

export class AbsenceDateFilterDTO implements IAbsenceDateFilter {
  @IsOptional()
  @IsDateString()
  start_date: Date;

  @IsOptional()
  @IsDateString()
  end_date: Date;
}
