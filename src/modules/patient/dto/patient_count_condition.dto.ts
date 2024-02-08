import {
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { IPatientCountCondition } from '../types/patient_count_condition.type';
import { Type } from 'class-transformer';

export class PatientCountConditionDTO implements IPatientCountCondition {
  @ValidateIf(
    (obj) => typeof obj.start_date === 'string' && obj.start_date !== '',
  )
  @IsOptional()
  @IsDateString()
  start_date: Date;

  @ValidateIf((obj) => typeof obj.end_date === 'string' && obj.end_date !== '')
  @IsOptional()
  @IsDateString()
  end_date: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  patient_id: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  clinic_id: number;
}
