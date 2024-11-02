import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { CreateAttendanceAndFloorManagerDto } from '../attendance-and-floor-manager/dto/create-attendance-and-floor-manager.dto';
import { CreateCateringManagerDto } from '../catering-manager/dto/create-catering-manager.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';
import { SignInResponse } from './interfaces/signin-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('student/signup')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createStudent(@Body() createStudent: CreateStudentDto): Promise<SignUpResponse> {
    return await this.authService.studentSignUp(createStudent);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
    
    return await this.authService.login(authCredentialsDto);
  }
}
