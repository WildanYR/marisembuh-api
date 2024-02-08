interface IUserClinic {
  id: number;
  name: string;
}

export interface IUserMap {
  id: number;
  email: string;
  name: string;
  role: string;
  clinic_id: number;
  clinic: IUserClinic;
}
