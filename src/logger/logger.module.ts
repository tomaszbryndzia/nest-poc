import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerService } from './logger.service';
import { Log } from './entities/log.entity';
import { LoggerController } from './logger.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  exports: [TypeOrmModule, LoggerService],
  providers: [LoggerService],
  controllers: [LoggerController],
})
export class LoggerModule {}
