import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ description: 'User id' })
  user_id: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Request body' })
  params: string;

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
