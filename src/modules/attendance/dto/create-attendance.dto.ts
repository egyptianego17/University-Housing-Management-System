import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateAttendanceManagerDto {
  @IsNumber()
  userId: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsBoolean()
  @IsOptional({ always: true })
  tookBreakfast?: boolean;

  @IsBoolean()
  @IsOptional({ always: true })
  tookLunch?: boolean;

  @IsBoolean()
  @IsOptional({ always: true })
  tookDinner?: boolean;
}
