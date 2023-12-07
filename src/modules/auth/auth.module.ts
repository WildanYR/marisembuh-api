import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { HashUtility } from 'src/utils/hash.util';
import { TokenModule } from '../token/token.module';
import { JwtAuthStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, TokenModule],
  providers: [HashUtility, AuthService, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
