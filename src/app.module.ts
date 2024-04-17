import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database/database.config';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { CookieHandlerService } from './cookie-handler/cookie-handler.service';
import { CookieHandlerModule } from './cookie-handler/cookie-handler.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UsersModule,
    AuthModule,
    LoggerModule,
    CookieHandlerModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, CookieHandlerService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
