import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendanceManagerService } from './attendance-manager.service';
import { CreateAttendanceManagerDto } from './dto/create-attendance-manager.dto';
import { UpdateAttendanceManagerDto } from './dto/update-attendance-manager.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('attendance-manager')
@ApiTags('AttendanceManager')
export class AttendanceManagerController {
  constructor(
    private readonly attendanceManagerService: AttendanceManagerService,
  ) {}

  @Post()
  create(@Body() createAttendanceManagerDto: CreateAttendanceManagerDto) {
    return this.attendanceManagerService.create(createAttendanceManagerDto);
  }

  @Get()
  findAll() {
    return this.attendanceManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceManagerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceManagerDto: UpdateAttendanceManagerDto,
  ) {
    return this.attendanceManagerService.update(
      +id,
      updateAttendanceManagerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceManagerService.remove(+id);
  }
}
