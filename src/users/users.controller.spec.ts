import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerService } from 'src/logger/logger.service';

const mockRepository: Repository<User> = {} as Repository<User>;

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John',
    email: 'john.johnson@johnsville.com',
    password: 'reallySecured',
    role: 'BASIC',
  },
  {
    id: 2,
    name: 'Dolly',
    email: 'dolly.molly@notholy.com',
    password: 'reallySecured',
    role: 'BASIC',
  },
  {
    id: 3,
    name: 'Marek',
    email: 'marek.to@nie.mariusz',
    password: 'reallySecured',
    role: 'BASIC',
  },
];

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    usersService = new UsersService(mockRepository, loggerService);
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = mockUsers;

      jest.spyOn(usersService, 'findAll').mockResolvedValue(result);
      await expect(await usersController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user when given an ID', async () => {
      const userId = 2;
      const mockUser: User = mockUsers.find((user) => user.id === userId);

      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);

      const result = await usersController.findOne(userId);

      expect(result).toBe(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user when given an ID and valid update data', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = {
        name: 'UpdatedName',
        email: 'updated.email@example.com',
      };

      jest.spyOn(usersService, 'update').mockResolvedValue();

      const result = await usersController.update(userId, updateUserDto);

      expect(result).toBeUndefined();
    });
  });
});
