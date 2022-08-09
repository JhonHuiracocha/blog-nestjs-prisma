import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
