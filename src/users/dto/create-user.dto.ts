import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['BASIC', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'BASIC' | 'ADMIN';
}
