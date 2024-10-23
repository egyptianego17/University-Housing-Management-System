import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceManagerDto } from './create-attendance_manager.dto';

export class UpdateAttendanceManagerDto extends PartialType(CreateAttendanceManagerDto) {}
