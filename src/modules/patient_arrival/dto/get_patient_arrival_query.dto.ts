import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { IGetPatientArrivalQuery } from '../types/get_patient_arrival_query.type';
import { Transform } from 'class-transformer';

export class GetPatientArrivalQueryDTO implements IGetPatientArrivalQuery {
  @IsOptional()
  @IsBoolean()
  @Transform((param) => param.value === 'true' || param.value === '1')
  done?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  patient_id?: number;

  @IsOptional()
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  tag_user_id?: number;

  @IsOptional()
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  user_id?: number;
}
