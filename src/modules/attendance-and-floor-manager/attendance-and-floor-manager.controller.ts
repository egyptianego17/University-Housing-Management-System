import {
  Controller,
  Post,
  Body,
  UsePipes,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AttendanceAndFloorManagerService } from './attendance-and-floor-manager.service';
import { CreateAttendanceAndFloorManagerDto } from './dto/create-attendance-and-floor-manager.dto';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';
import { AttendanceAndFloorManager } from './entities/attendance-and-floor-manager.entity';
import { UpdateAttendanceAndFloorManagerDto } from './dto/update-attendance-and-floor-manager.dto';

@Controller('attendance-and-floor-manager')
export class AttendanceAndFloorManagerController {
  constructor(
    private readonly attendanceAndFloorManagerService: AttendanceAndFloorManagerService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async addAttendanceAndFloorManager(
    @Body()
    createAttendanceAndFloorManagerDto: CreateAttendanceAndFloorManagerDto,
  ): Promise<SignUpResponse> {
    return this.attendanceAndFloorManagerService.create(
      createAttendanceAndFloorManagerDto,
    );
  }

  @Get()
  async getAll(): Promise<AttendanceAndFloorManager[]> {
    return this.attendanceAndFloorManagerService.findAll();
  }

  @Get('/:id')
  async getById(
    @Param() managerId: number,
  ): Promise<AttendanceAndFloorManager | undefined> {
    return this.attendanceAndFloorManagerService.findById(managerId);
  }

  @Patch('/:id')
  async update(
    @Param() managerId: number,
    @Body() updateManagerDto: UpdateAttendanceAndFloorManagerDto,
  ): Promise<SignUpResponse> {
    return this.attendanceAndFloorManagerService.update(
      managerId,
      updateManagerDto,
    );
  }

  @Delete('/:id')
  async deleteAttendenceAndFloorManager(
    @Param() managerId: number,
  ): Promise<SignUpResponse> {
    return this.attendanceAndFloorManagerService.delete(managerId);
  }
}
