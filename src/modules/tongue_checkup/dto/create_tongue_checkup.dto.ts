import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateTongueCheckup } from '../types/create_tongue_checkup.type';

export class CreateTongueCheckupDTO implements ICreateTongueCheckup {
  @IsNotEmpty()
  @IsString()
  name: string;
}
