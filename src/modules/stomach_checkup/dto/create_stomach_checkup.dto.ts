import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateStomachCheckup } from '../types/create_stomach_checkup.type';

export class CreateStomachCheckupDTO implements ICreateStomachCheckup {
  @IsNotEmpty()
  @IsString()
  name: string;
}
