import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttendanceManagerDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance) private repo: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceManagerDto) {
    try {
      createAttendanceDto.date = new Date(createAttendanceDto.date);
      const attendance = this.repo.create(createAttendanceDto);
      return await this.repo.save(attendance);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Attendance record already exists for this user and date.',
        );
      }
    }
  }

  async findAll() {
    const res = await this.repo.find();
    if (!res.length) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'No attendance records found',
        },
        HttpStatus.NO_CONTENT,
      );
    }
    return res;
  }

  async findOne(userId: number, date: Date) {
    const attendance = await this.repo.findOne({ where: { userId, date } });
    return attendance;
  }

  async update(
    userId: number,
    date: Date,
    updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const attendance = await this.findOne(userId, date);
    Object.assign(attendance, updateAttendanceDto);
    return this.repo.save(attendance);
  }

  async remove(userId: number, date: Date) {
    const attendance = await this.repo.findOne({ where: { userId, date } });
    if (!attendance) {
      throw new NotFoundException('Not found');
    }
    return this.repo.remove(attendance);
  }
}
