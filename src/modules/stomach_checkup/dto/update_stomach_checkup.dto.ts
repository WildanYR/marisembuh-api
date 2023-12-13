import { IsOptional, IsString } from 'class-validator';
import { IUpdateStomachCheckup } from '../types/update_stomach_checkup.type';

export class UpdateStomachCheckupDTO implements IUpdateStomachCheckup {
  @IsOptional()
  @IsString()
  name?: string;
}
