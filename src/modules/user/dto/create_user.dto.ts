import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
}
