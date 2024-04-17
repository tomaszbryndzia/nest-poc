import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const {
      originalUrl,
      method,
      cookies: { user_id },
      body,
    } = req;

    if (!isHttpMethod(method)) {
      return next();
    }

    this.loggerService.create({
      user_id,
      params: JSON.stringify(body),
      method: method as HttpMethod,
      url: originalUrl,
    });

    next();
  }
}

function isHttpMethod(method: string): method is HttpMethod {
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method as HttpMethod);
}
