import { Module } from '@nestjs/common';

import { PostsController } from './controllers';

import { PostsService } from './services';
import { PrismaService } from '../../common/services';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
