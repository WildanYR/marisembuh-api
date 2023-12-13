export interface ICreatePatient {
  name: string;
  gender: string;
  birthdate?: Date;
  address?: string;
  telp?: string;
  user_id: number;
  clinic_id: number;
}
