import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username', example: 'Johnathan203' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password', example: 'SecuredPassword123' })
  @IsString()
  password: string;

  @ApiProperty({ enum: ['BASIC', 'ADMIN'] })
  @IsEnum(['BASIC', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'BASIC' | 'ADMIN';
}
