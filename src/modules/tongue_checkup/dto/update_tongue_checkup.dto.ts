import { IsOptional, IsString } from 'class-validator';
import { IUpdateTongueCheckup } from '../types/update_tongue_checkup.type';

export class UpdateTongueCheckupDTO implements IUpdateTongueCheckup {
  @IsOptional()
  @IsString()
  name?: string;
}
