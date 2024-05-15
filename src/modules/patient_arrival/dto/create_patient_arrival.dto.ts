import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ICreatePatientArrival } from '../types/create_patient_arrival.type';
import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class CreatePatientArrivalDTO implements ICreatePatientArrival {
  @IsNotEmpty()
  @IsNumber()
  patient_id: number;

  @IsNotEmpty()
  @IsNumber()
  tag_user_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @ValidateIf((obj) => typeof obj.date === 'string' && obj.date !== '')
  @IsOptional()
  @IsDateString()
  @Transform((param) => DateTime.fromISO(param.value).toJSDate())
  date: Date;
}
