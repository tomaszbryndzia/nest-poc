import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeEach(async () => {
    // Mock each repository method properly
    mockRepository = {
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      })),
      findOneBy: jest.fn().mockResolvedValue(undefined),
      save: jest
        .fn()
        .mockImplementation((user) =>
          Promise.resolve({ ...user, id: Date.now() }),
        ),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
      create: jest.fn().mockImplementation((dto) => dto),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    mockRepository
      .createQueryBuilder()
      .getManyAndCount.mockResolvedValue([[], 0]);
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should retrieve and return a user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    mockRepository.findOneBy.mockResolvedValue(mockUser); // Ensure this line is correctly setting up the mock
    const result = await service.findOne(1);
    expect(result).toEqual(mockUser);
  });

  it('should throw a NotFoundException if no user is found', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should successfully create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password',
      role: 'ADMIN',
    };
    const result = await service.create(createUserDto);
    expect(result).toHaveProperty('id');
  });

  it('should update a user and return updated details', async () => {
    const updateUserDto = { name: 'Updated Name' };
    const mockUser = {
      id: 1,
      name: 'Original Name',
      email: 'email@example.com',
      role: 'ADMIN',
    };
    mockRepository.findOneBy.mockResolvedValue(mockUser);

    const result = await service.update(1, updateUserDto);

    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Updated Name' }),
    );
    expect(result).toEqual(
      expect.objectContaining({ id: 1, name: 'Updated Name' }),
    ); // Check the expected return
  });

  it('should throw an error if user does not exist', async () => {
    mockRepository.findOneBy.mockResolvedValue(undefined);
    await expect(service.update(999, {})).rejects.toThrow('User Not Found');
  });

  it('should delete a user', async () => {
    await service.delete(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});
