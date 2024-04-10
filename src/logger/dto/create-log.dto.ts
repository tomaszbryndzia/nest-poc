import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Action type' })
  action_type: string;

  @IsNotEmpty()
  @IsNumberString()
  user_id: number;

  @IsNumberString()
  action_id: number;
}
