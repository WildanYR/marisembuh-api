interface IPatientRegisteredBy {
  id: number;
  name: string;
  role: string;
}

interface IPatientRegisterClinic {
  id: number;
  name: string;
}

export interface IPatientMap {
  id: number;
  no_rm: string;
  name: string;
  gender: string;
  birthdate?: Date;
  address?: string;
  telp?: string;
  created_at: Date;
  registered_by?: IPatientRegisteredBy;
  register_clinic?: IPatientRegisterClinic;
}
