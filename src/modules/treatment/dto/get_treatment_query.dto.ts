import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { IGetTreatmentQuery } from '../types/get_treatment_query.type';
import { Transform } from 'class-transformer';

export class GetTreatmentQueryDTO implements IGetTreatmentQuery {
  @IsOptional()
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  patient_id: number;

  @IsOptional()
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  user_id: number;

  @IsOptional()
  @IsNumber()
  @Transform((param) => parseInt(param.value))
  clinic_id: number;

  @IsOptional()
  @IsBoolean()
  @Transform((param) => param.value === 'true' || param.value === '1')
  with_relation: boolean;
}
