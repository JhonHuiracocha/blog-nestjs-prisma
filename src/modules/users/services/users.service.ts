import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from '../dto';

import { hashPassword } from '../../../common/helpers';

import { PrismaService } from '../../../common/services';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  doesUserExist(email: string): Observable<boolean> {
    return from(
      this.prisma.user.findFirst({
        where: {
          email,
          status: true,
        },
      }),
    ).pipe(switchMap((userFound: User) => of(!!userFound)));
  }

  createUser(createUserDto: CreateUserDto): Observable<User> {
    const { email, password } = createUserDto;

    return this.doesUserExist(email).pipe(
      switchMap((doesUserExist: boolean) => {
        if (doesUserExist)
          throw new HttpException(
            'The user already exists.',
            HttpStatus.CONFLICT,
          );

        return hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            createUserDto.password = hashedPassword;

            return from(this.prisma.user.create({ data: createUserDto })).pipe(
              map((createdUser: User) => {
                delete createdUser.password;
                return createdUser;
              }),
            );
          }),
        );
      }),
    );
  }

  getUserById(id: string): Observable<User> {
    return from(
      this.prisma.user.findFirst({
        where: {
          id,
          status: true,
        },
      }),
    ).pipe(
      map((userFound: User) => {
        if (!userFound)
          throw new HttpException(
            'The user has not been found.',
            HttpStatus.NOT_FOUND,
          );

        delete userFound.password;
        return userFound;
      }),
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
