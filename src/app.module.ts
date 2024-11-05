import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { ManagedFloorsModule } from './modules/managed-floors/managed-floors.module';
import { ManagedMealsModule } from './modules/managed-meals/managed-meals.module';
import { NotificationModule } from './modules/notification/notification.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { AttendanceAndFloorManagerModule } from './modules/attendance-and-floor-manager/attendance-and-floor-manager.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: typeOrmConfig,
    }),
    UserModule,
    AnnouncementsModule,
    AttendanceModule,
    ComplaintsModule,
    ManagedFloorsModule,
    ManagedMealsModule,
    NotificationModule,
    AuthModule,
    AttendanceAndFloorManagerModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
