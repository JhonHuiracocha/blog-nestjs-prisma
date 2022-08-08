import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { validate } from './common/validators';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
