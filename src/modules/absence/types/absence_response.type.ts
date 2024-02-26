import { AbsenceStatus } from '../enums/absence_status.enum';

export interface IAbsenceResponse {
  status: AbsenceStatus;
  absence_code?: string;
}
