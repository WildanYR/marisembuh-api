import { ICreateDoctorDiagnosis } from './create_doctor_diagnosis.type';

export interface IUpdateDoctorDiagnosis
  extends Partial<ICreateDoctorDiagnosis> {}
