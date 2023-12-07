import { IsOptional, IsString } from 'class-validator';
import { IUpdateDoctorDiagnosis } from '../types/update_doctor_diagnosis.type';

export class UpdateDoctorDiagnosisDTO implements IUpdateDoctorDiagnosis {
  @IsOptional()
  @IsString()
  name?: string;
}
