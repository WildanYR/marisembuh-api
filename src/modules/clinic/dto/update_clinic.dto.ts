import { IsOptional, IsString } from 'class-validator';
import { IUpdateClinic } from '../types/update_clinic.type';

export class UpdateClinicDTO implements IUpdateClinic {
  @IsOptional()
  @IsString()
  name?: string;
}
