import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('attendance')
@ApiTags('Attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':userId/:date') // date must be formatted as: 'yyyy-mm-dd'
  findOne(@Param('userId') userId: string, @Param('date') date: string) {
    const parsedDate = new Date(date);
    return this.attendanceService.findOne(parseInt(userId), parsedDate);
  }

  @Patch(':userId/:date')
  update(
    @Param('userId') userId: string,
    @Param('date') date: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const parsedDate = new Date(date);

    return this.attendanceService.update(
      parseInt(userId),
      parsedDate,
      updateAttendanceDto,
    );
  }

  @Delete(':userId/:date')
  remove(@Param('userId') userId: string, @Param('date') date: string) {
    const parsedDate = new Date(date);
    return this.attendanceService.remove(parseInt(userId), parsedDate);
  }
}
