import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { CreateAttendanceAndFloorManagerDto } from '../attendance-and-floor-manager/dto/create-attendance-and-floor-manager.dto';
import { CreateCateringManagerDto } from '../catering-manager/dto/create-catering-manager.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';
import { SignInResponse } from './interfaces/signin-response.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { tokenStatusCheckResponse } from './interfaces/token-status-check-response.interface.ts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('student/signup')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createStudent(
    @Body() createStudent: CreateStudentDto,
  ): Promise<SignUpResponse> {
    return await this.authService.studentSignUp(createStudent);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignInResponse> {
    return await this.authService.login(authCredentialsDto);
  }

  @Get('token/status')
  @UseGuards(AuthGuard())
  async checkToken(@GetUser() user: User): Promise<tokenStatusCheckResponse> {
    return { status: 'Token is valid', firstName: user.firstName };
  }
}
