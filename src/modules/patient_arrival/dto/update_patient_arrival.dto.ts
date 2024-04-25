import { IsNumber, IsOptional } from 'class-validator';
import { IUpdatePatientArrival } from '../types/update_patient_arrival.type';

export class UpdatePatientArrivalDTO implements IUpdatePatientArrival {
  @IsOptional()
  @IsNumber()
  patient_id?: number;

  @IsOptional()
  @IsNumber()
  user_id?: number;
}
