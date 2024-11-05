import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
