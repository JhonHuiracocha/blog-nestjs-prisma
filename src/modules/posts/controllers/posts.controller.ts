import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { PostsService } from '../services';
import { Observable } from 'rxjs';
import { Post as PostModel } from '@prisma/client';

import { CreatePostDto, UpdatePostDto } from '../dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Observable<PostModel> {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getPosts(
    @Query('take') take: string,
    @Query('skip') skip: string,
  ): Observable<PostModel[]> {
    return this.postsService.getPosts(+take, +skip);
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Observable<PostModel> {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
