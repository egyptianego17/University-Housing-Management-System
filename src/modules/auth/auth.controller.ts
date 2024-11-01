import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { SignUpResponse } from './interfaces/signup-response.interface';
import { SignInResponse } from './interfaces/signin-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(
    @Body() createStudent: CreateStudentDto,
  ): Promise<SignUpResponse> {
    try {
      const message = await this.authService.studentSignUp(createStudent);
      return { message, success: true };
    } catch (error) {
      return { message: error.message || 'Signup failed', success: false };
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignInResponse> {
    try {
      const token = await this.authService.login(authCredentialsDto);
      return { token, success: true };
    } catch (error) {
      return { message: error.message || 'Login failed', success: false };
    }
  }
}
