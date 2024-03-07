export interface IAbsenceAnalyticDbResponse {
  id: number;
  name: string;
  normal: number;
  late: number;
}

export interface IAbsenceAnalyticResponse {
  id: number;
  name: string;
  total: number;
  late: number;
  absent: number;
}
