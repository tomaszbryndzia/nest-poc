import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CookieHandlerService } from '../cookie-handler/cookie-handler.service';

enum UserRole {
  basic = 'BASIC',
  admin = 'ADMIN',
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly cookieHandlerService: CookieHandlerService,
  ) {}

  @Get()
  @ApiQuery({ name: 'role', enum: UserRole, required: false })
  @ApiOkResponse({
    description: 'Get Array of users',
    type: CreateUserDto,
    isArray: true,
  })
  findAll(
    @Req() request,
    @Query('role') role?: 'BASIC' | 'ADMIN',
    @Query() pagination?: PaginationDto,
  ): Promise<User[]> {
    const { take, skip } = pagination;
    return this.userService.findAll(role, take, skip);
  }

  @ApiOkResponse({
    description: 'Get user',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(
    @Req() request,
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    const userId = this.cookieHandlerService.getCookie(request, 'user_id');

    return this.userService.create(createUserDto, +userId);
  }

  @Patch(':id')
  async update(
    @Req() request,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    const userId = this.cookieHandlerService.getCookie(request, 'user_id');

    return this.userService.update(id, updateUserDto, +userId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
