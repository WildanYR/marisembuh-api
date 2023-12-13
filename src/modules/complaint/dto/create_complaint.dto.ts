import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ICreateComplaint } from '../types/create_complaint.type';

export class CreateComplaintDTO implements ICreateComplaint {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  meridian_id: number;
}
