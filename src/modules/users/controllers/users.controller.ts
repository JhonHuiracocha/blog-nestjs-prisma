import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '@prisma/client';

import { UsersService } from '../services';

import { CreateUserDto, UpdateUserDto } from '../dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Observable<User> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
