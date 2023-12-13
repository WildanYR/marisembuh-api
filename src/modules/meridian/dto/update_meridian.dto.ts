import { IsOptional, IsString } from 'class-validator';
import { IUpdateMeridian } from '../types/update_meridian.type';

export class UpdateMeridianDTO implements IUpdateMeridian {
  @IsOptional()
  @IsString()
  name?: string;
}
