import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceManagerDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from '../student/student.service';
import { Role } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { EncryptionUtil } from 'src/utils/encryption.util';

@Controller('attendance')
@ApiTags('Attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly studentService: StudentService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ATTENDANCE_MANAGER')
  async create(@Body() createAttendanceDto: CreateAttendanceManagerDto) {
    const { userId } = createAttendanceDto;
    const student = await this.studentService.findOne(userId);
    if (!student) {
      throw new BadRequestException(`Student with id ${userId} not found`);
    }
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ATTENDANCE_MANAGER')
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':userId/:date') // date must be formatted as: 'yyyy-mm-dd'
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ATTENDANCE_MANAGER')
  async findOne(@Param('userId') userId: string, @Param('date') date: string) {
    const id = await EncryptionUtil.decryptId(userId);
    const parsedDate = new Date(date);
    const attendance = await this.attendanceService.findOne(id, parsedDate);
    if (!attendance) {
      return {
        status: 'ABSENT',
        date: parsedDate,
        userId: id,
        tookBreakfast: false,
        tookDinner: false,
        tookLunch: false,
      };
    }
    return { status: 'PRESENT', ...attendance };
  }

  @Patch(':userId/:date')
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ATTENDANCE_MANAGER')
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
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ATTENDANCE_MANAGER')
  remove(@Param('userId') userId: string, @Param('date') date: string) {
    const parsedDate = new Date(date);
    return this.attendanceService.remove(parseInt(userId), parsedDate);
  }
}
