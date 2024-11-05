import {
  IsString,
  Length,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
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
  studentIdImageUrl: string;

  @IsNumber()
  @Min(0)
  @Max(1000)
  room: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  floor: number;
}
