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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('attendance-manager')
@ApiTags('AttendanceManager')
export class AttendanceManagerController {
  constructor(
    private readonly attendanceManagerService: AttendanceManagerService,
  ) {}
}
