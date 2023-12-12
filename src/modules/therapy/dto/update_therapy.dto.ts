import { IsOptional, IsString } from 'class-validator';
import { IUpdateTherapy } from '../types/update_therapy.type';

export class UpdateTherapyDTO implements IUpdateTherapy {
  @IsOptional()
  @IsString()
  name?: string;
}
