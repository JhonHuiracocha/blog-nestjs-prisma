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
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Observable<PostModel[]> {
    return this.postsService.getPosts(page, limit);
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Observable<PostModel> {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  updatePostById(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Observable<PostModel> {
    return this.postsService.updatePostById(id, updatePostDto);
  }

  @Delete(':id')
  deletePostById(@Param('id') id: string): Observable<PostModel> {
    return this.postsService.deletePostById(id);
  }
}
