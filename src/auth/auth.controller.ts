import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RolesGuard } from './roleGuard/role.guard';
import { Roles } from './roleGuard/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() signInDto: Record<string, any>) {
    console.log(signInDto.email, signInDto.password, signInDto.name);
    return this.authService.register(
      signInDto.email,
      signInDto.password,
      signInDto.name,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('User')
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
