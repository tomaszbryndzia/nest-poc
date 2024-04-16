import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AccessTokenResponse {
  @ApiProperty()
  @IsNotEmpty()
  access_token: string;
}
