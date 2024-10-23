import { Module } from '@nestjs/common';
import { AttendanceManagerService } from './attendance_manager.service';
import { AttendanceManagerController } from './attendance_manager.controller';

@Module({
  controllers: [AttendanceManagerController],
  providers: [AttendanceManagerService],
})
export class AttendanceManagerModule {}
