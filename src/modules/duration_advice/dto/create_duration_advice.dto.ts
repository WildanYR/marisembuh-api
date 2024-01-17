import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateDurationAdvice } from '../types/create_duration_advice.type';

export class CreateDurationAdviceDTO implements ICreateDurationAdvice {
  @IsNotEmpty()
  @IsString()
  name: string;
}
