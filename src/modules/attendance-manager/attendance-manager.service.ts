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

}
