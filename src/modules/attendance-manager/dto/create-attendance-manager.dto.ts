import { IsString, IsEmail, IsStrongPassword, IsEnum, Length, IsDate, IsMobilePhone, IsOptional, IsNotEmpty, IsNumber, Min, Max, IsBoolean, IsArray} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceManagerDto {  
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Max(10, { each: true })
  @IsOptional()
  managedFloors: number[];
}
