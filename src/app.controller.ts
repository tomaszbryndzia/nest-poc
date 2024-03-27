import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get('private')
  privateEndpoint(): string {
    return this.appService.getHello();
  }

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
}
