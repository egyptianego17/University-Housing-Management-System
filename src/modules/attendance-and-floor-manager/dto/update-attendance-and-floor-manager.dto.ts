import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceAndFloorManagerDto } from './create-attendance-and-floor-manager.dto';

export class UpdateAttendanceAndFloorManagerDto extends PartialType(CreateAttendanceAndFloorManagerDto) {}
