import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AuthController {
  constructor(private readonly jwt: JwtService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async signin(@Request() request) {
    const payload = { username: request.user.login, sub: request.user.id };
    return { access_token: this.jwt.sign(payload) };
  }

  // funciona, mas não preciso desse código, vou deixar apenas como lembrete de como usar :)
  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // async profile(@Request() request) {
  //   return request.user;
  // }
}
