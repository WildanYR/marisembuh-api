import { ICreatePatient } from './create_patient.type';

export interface IUpdatePatient extends Partial<ICreatePatient> {}
