import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(findUserDto?: FindUserDto): Promise<User[]> {
    let queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (findUserDto?.role) {
      const { role } = findUserDto;
      queryBuilder.where('user.role = :role', { role });
    }

    queryBuilder = queryBuilder.orderBy('user.name', 'DESC');

    if (findUserDto?.skip) {
      queryBuilder = queryBuilder.skip(findUserDto.skip);
    }

    if (findUserDto?.take) {
      queryBuilder = queryBuilder.take(findUserDto.take);
    }

    const [result] = await queryBuilder.getManyAndCount();

    return result;
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

    return {
      id: res.id,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    const { name, email, role, password } = updateUserDto;
    const updatedUser = { ...user, name, email, role, password };

    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
