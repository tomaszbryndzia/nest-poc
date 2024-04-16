import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from './auth/public.decorator';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiUnauthorizedResponse({ description: 'Token mandatory' })
  @ApiOkResponse({ description: 'Token valid' })
  @Get('private')
  privateEndpoint(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
}
