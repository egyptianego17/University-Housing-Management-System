import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceManagerDto } from './create-attendance-manager.dto';

export class UpdateAttendanceManagerDto extends PartialType(CreateAttendanceManagerDto) {}
