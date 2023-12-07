import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ILoginData } from '../types/login.type';

export class LoginDTO implements ILoginData {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
