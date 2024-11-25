import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { StudentProfileInterface } from './interface/studentProfile.interface';
import { User } from '../user/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { EncryptionUtil } from '../../utils/encryption.util';

@Controller('student')
@ApiTags('Student')
export class StudentController {
  private readonly logger = new Logger(StudentController.name);

  constructor(private readonly studentService: StudentService) {}

  @Get('getMyProfile')
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('STUDENT')
  async getMyProfile(@GetUser() user: User): Promise<StudentProfileInterface> {
    this.logger.log(`User ${user.email} is getting his profile`);
    const studentProfile: StudentProfileInterface = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      nationalId: user.nationalId,
      faculty: user.student.faculty,
      room: user.student.room,
      floor: user.student.floor,
    };

    return studentProfile;
  }

  @Get('getQrCode')
  @UseGuards(AuthGuard(), RolesGuard)
  @Role('STUDENT')
  async getQrCode(@GetUser() user: User): Promise<string> {
    this.logger.log(`User ${user.email} is getting his QR code`);
    this.logger.log(`User ID: ${user.id}`);
    this.logger.log(`User ID encrypted: ${await EncryptionUtil.encryptId(user.id)}`);
    return await EncryptionUtil.encryptId(user.id);
  }
}
