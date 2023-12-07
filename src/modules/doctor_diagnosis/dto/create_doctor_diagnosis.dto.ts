import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateDoctorDiagnosis } from '../types/create_doctor_diagnosis.type';

export class CreateDoctorDiagnosisDTO implements ICreateDoctorDiagnosis {
  @IsNotEmpty()
  @IsString()
  name: string;
}
