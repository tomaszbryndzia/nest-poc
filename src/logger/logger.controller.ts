import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateLogDto } from './dto/create-log.dto';
import { DateGuard } from '../guards/date.guard';
import { FindLogsQueryDto } from './dto/find-logs-query.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';

@ApiTags('logger')
@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get Array of users',
    type: CreateLogDto,
    isArray: true,
  })
  async findAll(@Query() paginationDto?: PaginationDto) {
    return this.loggerService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(DateGuard)
  async findByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Query() query?: FindLogsQueryDto,
  ) {
    return this.loggerService.findByUserId(id, query);
  }
}
