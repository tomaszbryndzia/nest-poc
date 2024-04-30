import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies?.access_token?.length > 0) {
      return req.cookies.access_token as string;
    } else if (req.headers?.access_token) {
      return req.headers['access_token'] as string;
    }

    return null;
  }

  async validate(payload: any) {
    return { payload };
  }
}
