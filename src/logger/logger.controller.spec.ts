import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { Log } from './entities/log.entity';

const logArray: Log[] = [
  {
    id: 1,
    user_id: 123,
    params: '{"param1": "value1", "param2": "value2"}',
    method: 'POST',
    url: '/api/users',
    created_at: new Date(),
  },
  {
    id: 2,
    user_id: 456,
    params: '{"id": 123}',
    method: 'PUT',
    url: '/api/users/123',
    created_at: new Date(),
  },
  {
    id: 3,
    user_id: 789,
    params: '{"id": 789}',
    method: 'PATCH',
    url: '/api/users/789',
    created_at: new Date(),
  },
  {
    id: 4,
    user_id: 123,
    params: '{"id": 456}',
    method: 'DELETE',
    url: '/api/users/456',
    created_at: new Date(),
  },
];
describe('LoggerController', () => {
  let controller: LoggerController;
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggerController],
      providers: [
        LoggerService,
        {
          provide: getRepositoryToken(Log),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LoggerController>(LoggerController);
    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of logs', async () => {
      const result: Log[] = logArray;
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      const logs = await controller.findAll();

      expect(logs).toEqual(result);
    });
  });

  describe('findByUserId', () => {
    it('should return logs for a specific user', async () => {
      const userId = 1;
      const result: Log[] = logArray;
      jest.spyOn(service, 'findByUserId').mockResolvedValue(result);

      const logs = await controller.findByUserId(userId);

      expect(logs).toEqual(result);
    });
  });
});
