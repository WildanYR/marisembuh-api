import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IUpdateComplaint } from '../types/update_complaint.type';

export class UpdateComplaintDTO implements IUpdateComplaint {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  meridian_id?: number;
}
