import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ILoginData } from './types/login.type';
import { HashUtility } from 'src/utils/hash.util';
import { JwtService } from '../token/jwt.service';
import { IAuthResponse } from './types/auth_response.type';

@Injectable()
export class AuthService {
  constructor(
    private hashUtility: HashUtility,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: ILoginData): Promise<IAuthResponse> {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user) {
      throw new BadRequestException('email or password invalid');
    }
    const isPasswordMatch = await this.hashUtility.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('email or password invalid');
    }
    const token = this.jwtService.generateJwt({ id: user.id });
    return {
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    };
  }
}
