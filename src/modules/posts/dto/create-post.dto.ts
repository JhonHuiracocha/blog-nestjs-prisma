import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { User } from '@prisma/client';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150, { message: 'The title is too long.' })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: 'The description is too long.' })
  description?: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsNotEmptyObject()
  author: User;
}
