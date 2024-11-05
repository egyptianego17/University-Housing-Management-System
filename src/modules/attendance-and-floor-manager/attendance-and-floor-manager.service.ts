import { Injectable } from '@nestjs/common';
import { CreateAttendanceAndFloorManagerDto } from './dto/create-attendance-and-floor-manager.dto';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';

@Injectable()
export class AttendanceAndFloorManagerService {
  async addAttendanceAndFloorManager(
    createStudent: CreateAttendanceAndFloorManagerDto,
  ): Promise<SignUpResponse> {
    /* To DO */
    return { message: 'To DO', success: false };
  }
}
