import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { PublicRoute } from 'src/guards/public_route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login({ ...loginDTO });
  }
}
