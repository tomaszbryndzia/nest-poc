import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';

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
        action_type: 'test',
        action_id: 1,
      };
      const log = new Log(createLogDto);
      jest.spyOn(repository, 'create').mockReturnValue(log);
      jest.spyOn(repository, 'save').mockResolvedValue(log);

      await service.create(createLogDto);

      expect(repository.create).toHaveBeenCalledWith(createLogDto);
      expect(repository.save).toHaveBeenCalledWith(log);
    });
  });

  describe('findAll', () => {
    it('should return an array of logs', async () => {
      const logs: Log[] = [
        {
          id: 1,
          user_id: 1,
          action_type: 'test',
          action_id: 1,
          created_at: new Date(),
        },
      ];
      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValue([logs, logs.length]);

      const result = await service.findAll();

      expect(result).toEqual(logs);
    });
  });

  describe('findByUserId', () => {
    it('should return logs for a specific user', async () => {
      const userId = 1;
      const logs: Log[] = [
        {
          id: 1,
          user_id: userId,
          action_type: 'test',
          action_id: 1,
          created_at: new Date(),
        },
      ];
      const queryParams = {
        take: 10,
        skip: 0,
        startDate: new Date(),
        endDate: new Date(),
      };
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(logs),
      } as any);

      const result = await service.findByUserId(userId, queryParams);

      expect(result).toEqual(logs);
    });
  });
});
