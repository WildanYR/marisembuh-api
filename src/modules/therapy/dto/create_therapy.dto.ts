import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateTherapy } from '../types/create_therapy.type';

export class CreateTherapyDTO implements ICreateTherapy {
  @IsNotEmpty()
  @IsString()
  name: string;
}
