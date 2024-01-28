import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ICreatePatient } from '../types/create_patient.type';

export class CreatePatientDTO implements ICreatePatient {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @ValidateIf(
    (obj) => typeof obj.birthdate === 'string' && obj.birthdate !== '',
  )
  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  telp?: string;

  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNumber()
  clinic_id: number;
}
