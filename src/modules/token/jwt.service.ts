import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  generateJwt(payload: any): string {
    const secret = this.configService.get('key.jwt_secret');
    return jwt.sign(payload, secret);
  }
  verifyJwt(token: string) {
    const secret = this.configService.get('key.jwt_secret');
    return jwt.verify(token, secret) as any;
  }
}
