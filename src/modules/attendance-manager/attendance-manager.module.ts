import { Module } from '@nestjs/common';
import { AttendanceManagerService } from './attendance-manager.service';
import { AttendanceManagerController } from './attendance-manager.controller';

@Module({
  controllers: [AttendanceManagerController],
  providers: [AttendanceManagerService],
})
export class AttendanceManagerModule {}
