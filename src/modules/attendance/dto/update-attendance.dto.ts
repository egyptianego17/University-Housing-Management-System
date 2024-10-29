import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceManagerDto } from './create-attendance.dto';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceManagerDto) {}
