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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
