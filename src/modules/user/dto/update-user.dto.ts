import { IsString, IsEmail, IsStrongPassword, IsEnum, Length, IsDate, IsMobilePhone, IsOptional} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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

    @IsEnum(['MALE','FEMALE'])
    gender: string;

    @IsEmail()
    email: string;

    @IsDate()
    @Type(() => Date)
    birthDate!: Date;

    @IsMobilePhone('ar-EG')
    mobileNumber!: string;

    @IsString()
    @Length(14)
    nationalId: string;

    @IsOptional()
    nationalIdImageUrl: string;

    @IsEnum(['MALE','FEMALE','HYBRID'])
    section: string;
}
