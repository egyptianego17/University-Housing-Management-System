import { Module } from '@nestjs/common';
import { AttendanceManagerService } from './attendance-manager.service';
import { AttendanceManagerController } from './attendance-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceManager } from './entities/attendance-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceManager])],
  controllers: [AttendanceManagerController],
  providers: [AttendanceManagerService],
})
export class AttendanceManagerModule {}
