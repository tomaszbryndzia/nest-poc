import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(
    role?: 'BASIC' | 'ADMIN',
    take?: number,
    skip?: number,
  ): Promise<User[]> {
    const [result, total] = await this.usersRepository.findAndCount({
      order: { name: 'DESC' },
      take: take,
      skip: skip,
    });

    console.log('count: ', total);

    return [...result];
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async create(@Body() createUserDto: CreateUserDto): Promise<{ id: number }> {
    const user = new User(createUserDto);
    const res = await this.entityManager.save(user);
    return {
      id: res.id,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.entityManager.transaction(async (entityManager) => {
      const user = await this.findOne(id);

      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.role = updateUserDto.role;
      user.password = updateUserDto.password;

      const res = await entityManager.save(user);

      return { id: res.id };
    });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
