import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IRequestAbsence } from '../types/request_absence.type';
import { AbsenceType } from '../enums/absence_type.enum';

export class RequestAbsenceDTO implements IRequestAbsence {
  @IsNotEmpty()
  @IsEnum(AbsenceType)
  type: AbsenceType;

  @IsOptional()
  @IsString()
  data?: string;
}
