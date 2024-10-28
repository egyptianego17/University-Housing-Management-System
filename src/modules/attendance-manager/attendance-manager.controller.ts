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

  @Post()
  @ApiBody({
    description: 'Attendance manager creation data',
    type: CreateAttendanceManagerDto,
  })
  @ApiCreatedResponse({
    description: 'Attendance Manager is created successfully.',
  })
  @ApiConflictResponse({
    description: 'Attendance Manager already exists.',
  })
  @ApiBadRequestResponse({
    description: 'The request body does not match the expected schema.',
  })
  create(@Body() createAttendanceManagerDto: CreateAttendanceManagerDto) {
    return this.attendanceManagerService.create(createAttendanceManagerDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of all attendance managers retrieved successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The request was malformed or invalid.',
  })
  @ApiNoContentResponse({
    description: 'No attendance manager found.',
  })
  findAll() {
    return this.attendanceManagerService.findAll();
  }

  @Get(':userId')
  @ApiOkResponse({
    description:
      'The attendance manager with the specified ID retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Attendance Manager not found for the given ID.',
  })
  @ApiBadRequestResponse({
    description: 'The user ID provided is not valid.',
  })
  findOne(@Param('userId') userId: string) {
    return this.attendanceManagerService.findOne(+userId);
  }

  @Patch(':userId')
  @ApiBody({
    description: 'Data to update the attendance manager',
    type: UpdateAttendanceManagerDto,
  })
  @ApiOkResponse({
    description: 'Attendance Manager updated successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Attendance Manager not found for the given ID.',
  })
  @ApiBadRequestResponse({
    description:
      'The request body does not match the expected schema or the new userId is already in\
      use or the user ID is invalid.',
  })
  update(
    @Param('userId') userId: string,
    @Body() updateAttendanceManagerDto: UpdateAttendanceManagerDto,
  ) {
    return this.attendanceManagerService.update(
      +userId,
      updateAttendanceManagerDto,
    );
  }

  @Delete(':userId')
  @ApiOkResponse({
    description: 'Attendance Manager removed successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Attendance Manager not found for the given ID.',
  })
  @ApiBadRequestResponse({
    description: 'The user ID provided is not valid.',
  })
  remove(@Param('userId') userId: string) {
    return this.attendanceManagerService.remove(+userId);
  }
}
