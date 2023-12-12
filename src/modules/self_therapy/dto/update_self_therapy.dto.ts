import { IsOptional, IsString } from 'class-validator';
import { IUpdateSelfTherapy } from '../types/update_self_therapy.type';

export class UpdateSelfTherapyDTO implements IUpdateSelfTherapy {
  @IsOptional()
  @IsString()
  name?: string;
}
