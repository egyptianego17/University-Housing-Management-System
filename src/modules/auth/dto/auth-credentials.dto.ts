import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthCredentialsDto {
    @IsStrongPassword()
    password: string;

    @IsEmail()
    email: string;
}