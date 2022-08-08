import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: 'The username is too long' })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64, { message: 'The password is too long' })
  password: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
