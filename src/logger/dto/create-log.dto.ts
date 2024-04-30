import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ description: 'User id' })
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Request url' })
  url: string;

  @ApiProperty({
    enum: ['PUT', 'POST', 'PATCH', 'DELETE'],
  })
  @IsEnum(['PUT', 'POST', 'PATCH', 'DELETE'], {
    message: 'Valid HTTP request method required',
  })
  method: 'PUT' | 'POST' | 'PATCH' | 'DELETE';
}
