import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceManager } from './entities/attendance-manager.entity';

@Injectable()
export class AttendanceManagerService {
  constructor(
    @InjectRepository(AttendanceManager)
    private repo: Repository<AttendanceManager>,
  ) {}
}
