import { Controller } from '@nestjs/common';
import { AttendanceManagerService } from './attendance-manager.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('attendance-manager')
@ApiTags('AttendanceManager')
export class AttendanceManagerController {
  constructor(
    private readonly attendanceManagerService: AttendanceManagerService,
  ) {}
}
