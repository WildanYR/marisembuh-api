import { IsNotEmpty, IsNumber } from 'class-validator';
import { ICreatePatientArrival } from '../types/create_patient_arrival.type';

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
}
