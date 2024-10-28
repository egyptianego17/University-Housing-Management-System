import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAttendanceManagerDto {
  @IsNumber()
  @ApiProperty({ description: 'The user id for the attendance manager' })
  userId: number;
}
