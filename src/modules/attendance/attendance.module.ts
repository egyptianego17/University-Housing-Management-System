import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../student/entities/student.entity';
import { StudentService } from '../student/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student])],
  controllers: [AttendanceController],
  providers: [AttendanceService, StudentService],
})
export class AttendanceModule {}
