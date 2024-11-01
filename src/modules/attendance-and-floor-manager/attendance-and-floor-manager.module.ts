import { Module } from '@nestjs/common';
import { AttendanceAndFloorManagerService } from './attendance-and-floor-manager.service';
import { AttendanceAndFloorManagerController } from './attendance-and-floor-manager.controller';

@Module({
  controllers: [AttendanceAndFloorManagerController],
  providers: [AttendanceAndFloorManagerService],
})
export class AttendanceAndFloorManagerModule {}
