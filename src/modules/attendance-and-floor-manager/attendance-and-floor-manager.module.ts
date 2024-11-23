import { Module } from '@nestjs/common';
import { AttendanceAndFloorManagerService } from './attendance-and-floor-manager.service';
import { AttendanceAndFloorManagerController } from './attendance-and-floor-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceAndFloorManager } from './entities/attendance-and-floor-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceAndFloorManager])],
  controllers: [AttendanceAndFloorManagerController],
  providers: [AttendanceAndFloorManagerService],
})
export class AttendanceAndFloorManagerModule {}
