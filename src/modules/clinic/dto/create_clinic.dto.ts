import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateClinic } from '../types/create_clinic.type';

export class CreateClinicDTO implements ICreateClinic {
  @IsNotEmpty()
  @IsString()
  name: string;
}
