import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateUser } from './../types/create_user.type';

export class CreateUserDTO implements ICreateUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsNumber()
  clinic_id: number;
}
