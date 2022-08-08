import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Post } from '@prisma/client';

import { PrismaService } from '../../../common/services';

import { CreatePostDto, UpdatePostDto } from '../dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  createPost(createPostDto: CreatePostDto): Observable<Post> {
    const { author } = createPostDto;

    return from(
      this.prisma.post.create({
        data: {
          ...createPostDto,
          author: {
            connect: {
              id: author.id,
            },
          },
        },
      }),
    );
  }

  getPosts(take: number = 20, skip: number = 0): Observable<Post[]> {
    return from(
      this.prisma.post.findMany({
        where: {
          status: true,
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
