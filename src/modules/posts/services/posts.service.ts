import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable, switchMap, of, map } from 'rxjs';
import { Post } from '@prisma/client';

import { PrismaService } from '../../../common/services';

import { CreatePostDto, UpdatePostDto } from '../dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  doesPostExist(title: string): Observable<boolean> {
    return from(
      this.prisma.post.findFirst({
        where: {
          title,
          status: true,
        },
      }),
    ).pipe(switchMap((postFound: Post) => of(!!postFound)));
  }

  createPost(createPostDto: CreatePostDto): Observable<Post> {
    const { authorId, title } = createPostDto;

    return this.doesPostExist(title).pipe(
      switchMap((doesPostExist: boolean) => {
        if (doesPostExist)
          throw new HttpException(
            'The post already exists.',
            HttpStatus.CONFLICT,
          );

        return from(
          this.prisma.post.create({
            data: {
              ...createPostDto,
              authorId,
            },
          }),
        );
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

  getPostById(id: string): Observable<Post> {
    return from(
      this.prisma.post.findFirst({
        where: {
          id,
          status: true,
        },
        include: {
          author: true,
        },
      }),
    ).pipe(
      map((postFound: Post) => {
        if (!postFound)
          throw new HttpException(
            'The post has not been found.',
            HttpStatus.NOT_FOUND,
          );

        return postFound;
      }),
    );
  }

  updatePostById(id: string, updatePostDto: UpdatePostDto): Observable<Post> {
    return from(
      this.prisma.post.findFirst({
        where: {
          id,
          status: true,
        },
      }),
    ).pipe(
      switchMap((postFound: Post) => {
        if (!postFound)
          throw new HttpException(
            'The post has not been found.',
            HttpStatus.NOT_FOUND,
          );

        return from(
          this.prisma.post.update({
            where: {
              id,
            },
            data: updatePostDto,
          }),
        );
      }),
    );
  }

  deletePostById(id: string): Observable<Post> {
    return from(
      this.prisma.post.findFirst({
        where: {
          id,
          status: true,
        },
      }),
    ).pipe(
      switchMap((postFound: Post) => {
        if (!postFound)
          throw new HttpException(
            'The post has not been found.',
            HttpStatus.NOT_FOUND,
          );

        return from(
          this.prisma.post.update({
            where: {
              id,
            },
            data: {
              status: false,
            },
          }),
        );
      }),
    );
  }
}
