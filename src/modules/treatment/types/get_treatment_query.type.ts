export interface IGetTreatmentQuery {
  patient_id: number;
  user_id: number;
  clinic_id: number;
  with_relation: boolean;
}
