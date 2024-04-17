// cookie-handler.service.ts
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CookieHandlerService {
  getCookie(request: Request, cookieName: string): string | undefined {
    const cookies = request.cookies;
    return cookies[cookieName];
  }

  setCookie(
    response: Response,
    cookieName: string,
    cookieValue: string,
    options?: any,
  ) {
    response.cookie(cookieName, cookieValue, options);
  }

  clearCookie(response: Response, cookieName: string, options?: any) {
    response.clearCookie(cookieName, options);
  }
}
