import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateMeridian } from '../types/create_meridian.type';

export class CreateMeridianDTO implements ICreateMeridian {
  @IsNotEmpty()
  @IsString()
  name: string;
}
