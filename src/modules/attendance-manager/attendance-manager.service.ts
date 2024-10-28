import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttendanceManagerDto } from './dto/create-attendance-manager.dto';
import { UpdateAttendanceManagerDto } from './dto/update-attendance-manager.dto';
import { AttendanceManager } from './entities/attendance-manager.entity';

@Injectable()
export class AttendanceManagerService {
  constructor(
    @InjectRepository(AttendanceManager)
    private repo: Repository<AttendanceManager>,
  ) {}

  async create(createAttendanceManagerDto: CreateAttendanceManagerDto) {
    try {
      const attendanceManager = this.repo.create(createAttendanceManagerDto);
      return await this.repo.save(attendanceManager);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Attendance Manager already exists');
      }
    }
  }

  async findAll() {
    const res = await this.repo.find();
    if (!res.length) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'No attendance managers found',
        },
        HttpStatus.NO_CONTENT,
      );
    }
    return res;
  }

  async findOne(userId: number) {
    const attendanceManager = await this.repo.findOne({ where: { userId } });
    if (!attendanceManager) {
      throw new NotFoundException('Attendance Manager not found');
    }
    return attendanceManager;
  }

  async update(
    userId: number,
    updateAttendanceManagerDto: UpdateAttendanceManagerDto,
  ) {
    const attendanceManager = await this.findOne(userId);
    Object.assign(attendanceManager, updateAttendanceManagerDto);
    return this.repo.save(attendanceManager);
  }

  async remove(userId: number) {
    const attendanceManager = await this.findOne(userId);
    return this.repo.remove(attendanceManager);
  }
}
