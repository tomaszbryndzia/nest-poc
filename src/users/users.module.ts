import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoggerModule } from '../logger/logger.module';
import { CookieHandlerModule } from 'src/cookie-handler/cookie-handler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LoggerModule,
    CookieHandlerModule,
  ],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
