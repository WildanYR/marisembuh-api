export interface IGetPatientArrivalQuery {
  done?: boolean;
  patient_id?: number;
  user_id?: number;
  tag_user_id?: number;
  type?: string;
  start_date?: string;
  end_date?: string;
}
