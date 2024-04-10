import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { Log } from './entities/log.entity'; // Ensure correct import path

const logArray = [
  {
    id: 1,
    user_id: 1,
    action_type: 'test',
    action_id: 1,
    created_at: new Date(),
  },
  {
    id: 2,
    user_id: 2,
    action_type: 'login',
    action_id: 2,
    created_at: new Date('2024-04-11'),
  },
  {
    id: 3,
    user_id: 3,
    action_type: 'logout',
    action_id: 3,
    created_at: new Date('2024-04-10'),
  },
  {
    id: 4,
    user_id: 4,
    action_type: 'update_profile',
    action_id: 4,
    created_at: new Date('2024-04-09'),
  },
  {
    id: 5,
    user_id: 5,
    action_type: 'delete_account',
    action_id: 5,
    created_at: new Date('2024-04-08'),
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
