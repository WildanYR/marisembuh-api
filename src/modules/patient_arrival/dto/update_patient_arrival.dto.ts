import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IUpdatePatientArrival } from '../types/update_patient_arrival.type';
import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class UpdatePatientArrivalDTO implements IUpdatePatientArrival {
  @IsOptional()
  @IsNumber()
  patient_id?: number;

  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @ValidateIf((obj) => typeof obj.date === 'string' && obj.date !== '')
  @IsOptional()
  @IsDateString()
  @Transform((param) => {
    if (param.value) {
      return DateTime.fromISO(param.value).toJSDate();
    }
    return null;
  })
  date?: Date;
}
