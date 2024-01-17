import { IsOptional, IsString } from 'class-validator';
import { IUpdateDurationAdvice } from '../types/update_duration_advice.type';

export class UpdateDurationAdviceDTO implements IUpdateDurationAdvice {
  @IsOptional()
  @IsString()
  name?: string;
}
