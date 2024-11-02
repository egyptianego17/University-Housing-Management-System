import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { AttendanceAndFloorManagerService } from './attendance-and-floor-manager.service';
import { CreateAttendanceAndFloorManagerDto } from './dto/create-attendance-and-floor-manager.dto';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';
import { ValidationPipe } from '@nestjs/common';

@Controller('attendance-and-floor-manager')
export class AttendanceAndFloorManagerController {
  constructor(private readonly attendanceAndFloorManagerService: AttendanceAndFloorManagerService) {}

  @Post('add/attendance-and-floor-manager')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async addAttendanceAndFloorManager(@Body() createAttendanceAndFloorManagerDto: CreateAttendanceAndFloorManagerDto ): Promise<SignUpResponse> {
    return await this.attendanceAndFloorManagerService.addAttendanceAndFloorManager(createAttendanceAndFloorManagerDto);
  }

}
