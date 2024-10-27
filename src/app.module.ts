import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AttendanceManagerModule } from './modules/attendance-manager/attendance-manager.module';
import { CateringManagerModule } from './modules/catering-manager/catering-manager.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { FloorManagerModule } from './modules/floor-manager/floor-manager.module';
import { ManagedFloorsModule } from './modules/managed-floors/managed-floors.module';
import { ManagedMealsModule } from './modules/managed-meals/managed-meals.module';
import { NotificationModule } from './modules/notification/notification.module';
import { StudentModule } from './modules/student/student.module';
import { Announcement } from './modules/announcements/entities/announcement.entity';
import { Attendance } from './modules/attendance/entities/attendance.entity';
import { AttendanceManager } from './modules/attendance-manager/entities/attendance-manager.entity';
import { CateringManager } from './modules/catering-manager/entities/catering-manager.entity';
import { Complaint } from './modules/complaints/entities/complaint.entity';
import { FloorManager } from './modules/floor-manager/entities/floor-manager.entity';
import { ManagedFloor } from './modules/managed-floors/entities/managed-floor.entity';
import { ManagedMeal } from './modules/managed-meals/entities/managed-meal.entity';
import { Notification } from './modules/notification/entities/notification.entity';
import { Student } from './modules/student/entities/student.entity';
import { User } from './modules/user/entities/user.entity';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: typeOrmConfig,
    }),
    AnnouncementsModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
