import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Action type', example: 'CREATE_USER' })
  action_type: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ description: 'User id' })
  user_id: number;

  @IsNumberString()
  @ApiProperty()
  action_id: number;
}