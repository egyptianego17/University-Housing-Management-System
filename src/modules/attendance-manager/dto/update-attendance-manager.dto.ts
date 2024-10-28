import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceManagerDto } from './create-attendance-manager.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttendanceManagerDto extends PartialType(
  CreateAttendanceManagerDto,
) {
  @ApiProperty({ description: 'The new userId' })
  userId?: number;
}
