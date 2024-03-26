import { UsersService } from './users.service';
import { Repository, EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

const mockRepository: Repository<User> = {} as Repository<User>;
const mockEntityManager: EntityManager = {} as EntityManager;

describe('UsersController', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService(mockRepository, mockEntityManager);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'John',
          email: 'john.johnson@johnsville.com',
          password: 'reallySecured',
          role: 'BASIC',
        },
      ];

      mockRepository.find = jest.fn().mockResolvedValue(mockUsers);

      const result = await usersService.findAll();
      expect(result).toEqual(mockUsers);
    });
  });
});
