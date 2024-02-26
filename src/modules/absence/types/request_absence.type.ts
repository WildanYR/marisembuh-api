import { AbsenceType } from '../enums/absence_type.enum';

export interface IRequestAbsence {
  type: AbsenceType;
  data?: string;
}
