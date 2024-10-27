import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateAttendanceDto {
  @IsNumber()
  userId: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsBoolean()
  tookBreakfast?: boolean;

  @IsBoolean()
  tookLunch?: boolean;

  @IsBoolean()
  tookDinner?: boolean;
}