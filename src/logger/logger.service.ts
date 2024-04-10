import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindLogsQueryDto } from './dto/find-logs-query.dto';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  //probably we would need to assign userId here to simplify action
  create(@Body() createLogDto: CreateLogDto): void {
    if (!createLogDto.action_id)
      throw new BadRequestException('action_id is required');

    const log = this.logRepository.create(createLogDto);
    this.logRepository.save(log);
  }

  async findAll(take?: number, skip?: number): Promise<Log[]> {
    const [result, total] = await this.logRepository.findAndCount({
      take: take,
      skip: skip,
    });

    console.log('count: ', total);

    return [...result];
  }

  //might be expanded to support hours, minutes, seconds
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
