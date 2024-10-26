import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsEnum, Length, Matches, IsDate, IsMobilePhone, IsNumber, IsIdentityCard, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {  
    @IsStrongPassword()
    password: string;

    @IsString()
    @Length(3, 25)
    firstName: string;

    @IsString()
    @Length(3, 25)
    middleName: string;

    @IsString()
    @Length(3, 25)
    lastName: string;

    @ApiProperty({ description: 'The username of the user' })
    @IsString()
    @Length(3, 25)
    @Matches(/^\S+$/, { message: 'Username must not contain spaces and must be a single word.' })
    @Transform(({ value }) => value.trim()) 
    username: string;

    @IsEnum(['MALE','FEMALE'])
    gender: number;

    @IsEmail()
    email: string;

    @IsDate()
    birthDate!: Date;

    @IsMobilePhone('ar-EG')
    mobileNumber!: string;

    @IsNumber()
    @IsIdentityCard()
    @Length(14)
    nationalId: number;

    @IsOptional()
    nationalIdImageUrl: string;
  
    @IsEnum(['MALE','FEMALE','HYBRID'])
    section: string;
}
