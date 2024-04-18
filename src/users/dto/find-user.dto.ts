import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class FindUserDto extends PaginationDto {
  @ApiProperty({ enum: ['BASIC', 'ADMIN'], required: false })
  @IsEnum(['BASIC', 'ADMIN'], {
    message: 'Valid role required',
  })
  @IsOptional()
  role?: 'BASIC' | 'ADMIN';
}
