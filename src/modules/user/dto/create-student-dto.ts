import { IsString ,Length, IsOptional, IsNumber, Min, Max, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class CreateUserAndStudentDto extends CreateUserDto {
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
  @IsOptional()
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

  @IsNumber()
  room: string;

  @IsNumber()
  floor: string;
}