import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IUpdateUser } from '../types/update_user.type';

export class UpdateUserDTO implements IUpdateUser {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
