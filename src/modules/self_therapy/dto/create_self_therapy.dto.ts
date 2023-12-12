import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateSelfTherapy } from '../types/create_self_therapy.type';

export class CreateSelfTherapyDTO implements ICreateSelfTherapy {
  @IsNotEmpty()
  @IsString()
  name: string;
}
