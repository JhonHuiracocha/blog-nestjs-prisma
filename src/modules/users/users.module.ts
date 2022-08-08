import { Module } from '@nestjs/common';

import { UsersController } from './controllers';

import { UsersService } from './services';
import { PrismaService } from '../../common/services';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
