import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

const ACTION_TYPE = {
  create: 'CREATE_USER',
  update: 'UPDATE_USER',
  delete: 'DELETE_USER',
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly loggerService: LoggerService,
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
    const user = this.usersRepository.create(createUserDto);
    const res = await this.usersRepository.save(user);

    this.loggerService.create({
      action_type: ACTION_TYPE.create,
      user_id: 323,
      action_id: res.id,
    });

    return {
      id: res.id,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.role = updateUserDto.role;
    user.password = updateUserDto.password;

    await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
