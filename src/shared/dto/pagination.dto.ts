import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  take?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  skip?: number;
}
