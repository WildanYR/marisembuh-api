import { IUpdatePatient } from '../types/update_patient.type';

export class UpdatePatientDTO implements IUpdatePatient {
  name?: string;
  gender?: string;
  birthdate?: Date;
  address?: string;
  telp?: string;
  user_id?: number;
  clinic_id?: number;
}
