import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import joi from 'joi';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DB_DATABASE: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_PORT: joi.number().default('3306'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (envConfigService: ConfigService) => ({
        type: 'mysql',
        entities: [],
        database: envConfigService.get<string>('DB_DATABASE'),
        username: envConfigService.get<string>('DB_USER'),
        password: envConfigService.get<string>('DB_PASSWORD'),
        port: envConfigService.get<number>('DB_PORT'),
        synchronize: true,
      }),
    }),
    UserModule,
    AnnouncementsModule,
    AttendanceModule,
    AttendanceManagerModule,
    CateringManagerModule,
    ComplaintsModule,
    FloorManagerModule,
    ManagedFloorsModule,
    ManagedMealsModule,
    NotificationModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
