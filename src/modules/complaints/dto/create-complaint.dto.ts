import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateComplaintDto {
  @IsNumber()
  @IsPositive()
  studentId: number;

  @IsNumber()
  @IsPositive()
  managerId: number;

  @IsDate()
  issueDate: Date;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  response: string;

  @IsDate()
  responseDate: Date;

  @IsBoolean()
  solved: boolean;
}
