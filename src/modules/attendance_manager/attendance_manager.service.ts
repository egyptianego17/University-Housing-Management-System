import { Injectable } from '@nestjs/common';
import { CreateAttendanceManagerDto } from './dto/create-attendance_manager.dto';
import { UpdateAttendanceManagerDto } from './dto/update-attendance_manager.dto';

@Injectable()
export class AttendanceManagerService {
  create(createAttendanceManagerDto: CreateAttendanceManagerDto) {
    return 'This action adds a new attendanceManager';
  }

  findAll() {
    return `This action returns all attendanceManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendanceManager`;
  }

  update(id: number, updateAttendanceManagerDto: UpdateAttendanceManagerDto) {
    return `This action updates a #${id} attendanceManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendanceManager`;
  }
}
