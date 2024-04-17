import { Module } from '@nestjs/common';
import { CookieHandlerService } from './cookie-handler.service';

@Module({
  exports: [CookieHandlerService],
  providers: [CookieHandlerService],
})
export class CookieHandlerModule {}
