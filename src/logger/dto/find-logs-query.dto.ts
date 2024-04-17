import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate } from 'class-validator';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class FindLogsQueryDto extends PaginationDto {
  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  endDate?: Date;
}
