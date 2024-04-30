import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindLogsQueryDto } from './dto/find-logs-query.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    const log = this.logRepository.create(createLogDto);
    return this.logRepository.save(log);
  }

  async findAll(paginationDto?: PaginationDto): Promise<Log[]> {
    const { take = 10, skip = 0 } = paginationDto || {}; // Provide default values for take and skip

    const [result] = await this.logRepository.findAndCount({
      take,
      skip,
    });

    return [...result];
  }

  async findByUserId(
    id: number,
    queryParams?: FindLogsQueryDto,
  ): Promise<Log[]> {
    const { startDate, endDate } = queryParams;

    let queryBuilder = this.logRepository
      .createQueryBuilder('log')
      .where('user_id= :userId', { userId: id });

    if (startDate && endDate) {
      queryBuilder = queryBuilder.where(
        'log.created_at BETWEEN :startDate AND :endDate',
        { startDate, endDate },
      );
    } else if (startDate) {
      queryBuilder = queryBuilder.where('log.created_at >= :startDate', {
        startDate,
      });
    } else if (endDate) {
      queryBuilder = queryBuilder.where('log.created_at <= :endDate', {
        endDate,
      });
    }

    const userLogs = await queryBuilder
      .take(queryParams.take)
      .skip(queryParams.skip)
      .getMany();

    return userLogs;
  }
}
