import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DateGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const queryParams = request.query;

    for (const key in queryParams) {
      if (key.toLowerCase().includes('date')) {
        const dateString = queryParams[key];

        const date = new Date(dateString);

        if (isNaN(date.getTime()) || date.toISOString() !== dateString) {
          throw new BadRequestException(
            `Invalid date format for parameter '${key}', expected format: "YYYY-MM-DDTHH:mm:ss.sssZ".`,
          );
        }
      }
    }

    return true;
  }
}
