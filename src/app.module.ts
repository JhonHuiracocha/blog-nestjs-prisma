import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';

import { AppController } from './app.controller';

import { TransformInterceptor } from './common/interceptors';

import { AppService } from './app.service';

import { validate } from './common/validators';

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
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
