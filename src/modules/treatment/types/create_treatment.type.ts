import { IPulseCheckup } from './pulse_checkup.type';
import { ITherapyAction } from './therapy_action.type';

export interface ICreateTreatment {
  objective: string;
  blood_pressure?: string;
  pulse_frequency?: string;
  is_pregnant?: boolean;
  evaluation?: string;
  duration_advice_id?: number;
  patient_id: number;
  treatment_packet_id?: number;
  doctor_diagnosis?: number[];
  medicine?: number[];
  therapy_history?: number[];
  complaint?: number[];
  stomach_checkup?: number[];
  pulse_checkup?: IPulseCheckup;
  tongue_checkup?: number[];
  therapy: ITherapyAction[];
  self_therapy?: number[];
}
