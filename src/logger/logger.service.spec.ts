// logger/logger.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerService } from './logger.service';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';

describe('LoggerService', () => {
  let service: LoggerService;
  let repository: Repository<Log>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: getRepositoryToken(Log),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
    repository = module.get<Repository<Log>>(getRepositoryToken(Log));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new log', async () => {
      const createLogDto: CreateLogDto = {
        user_id: 1,
        params:
          '{"name":"John","email":"test@xxxx.com","password":"test","role":"ADMIN"}',
        method: 'POST',
        url: '/users',
      };

      const createSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValue(createLogDto as Log);
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(createLogDto as Log);

      const result = await service.create(createLogDto);

      expect(createSpy).toHaveBeenCalledWith(createLogDto);
      expect(saveSpy).toHaveBeenCalledWith(createLogDto);

      expect(result).toEqual(createLogDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of logs', async () => {
      const paginationDto: PaginationDto = {
        take: 10,
        skip: 0,
      };

      const findAndCountSpy = jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValueOnce([[], 0]);

      const logs = await service.findAll(paginationDto);

      expect(findAndCountSpy).toHaveBeenCalledWith({
        take: paginationDto.take,
        skip: paginationDto.skip,
      });
      expect(logs).toEqual([]);
    });
  });

  // Add tests for other methods as needed
});
