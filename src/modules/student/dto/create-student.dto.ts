import { IsString, Length, IsOptional, IsNumber, Min, Max, IsBoolean} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
export class CreateStudentDto extends CreateUserDto
{
    @IsString()
    @Length(5, 100)
    address: string;

    @IsString()
    @Length(2, 25)
    faculty: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    grade: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    lastYearAcademicGrade: number;

    @IsBoolean()
    @IsOptional()
    disability: boolean;

    @IsOptional()
    @IsString()
    @Length(10, 255)
    studentIdImageUrl: string;

    @IsString()
    room: string;

    @IsNumber()
    @Min(0)
    @Max(10)
    floor: number;
}
