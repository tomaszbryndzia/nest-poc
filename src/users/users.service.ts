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

  async create(
    @Body() createUserDto: CreateUserDto,
    userId: number,
  ): Promise<{ id: number }> {
    const user = this.usersRepository.create(createUserDto);
    const res = await this.usersRepository.save(user);

    this.loggerService.create({
      action_type: ACTION_TYPE.create,
      action_id: res.id,
      user_id: userId,
    });

    return {
      id: res.id,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    userId: number,
  ): Promise<{ message: string }> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    const { name, email, role, password } = updateUserDto;
    const updatedUser = { ...user, name, email, role, password };

    await this.usersRepository.save(updatedUser);

    this.loggerService.create({
      action_id: id,
      user_id: userId,
      action_type: ACTION_TYPE.update,
    });

    return {
      message: `User ${id} succesfully updated `,
    };
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
