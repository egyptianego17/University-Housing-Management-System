import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../student/entities/student.entity';
import { StudentService } from '../student/student.service';
import { DecryptUserIdMiddleware } from './decrypt-user-id/decrypt-user-id.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student]), AuthModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, StudentService],
})
export class AttendanceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptUserIdMiddleware).forRoutes('attendance/create');
  }
}
