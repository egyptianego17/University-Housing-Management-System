import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsePipes } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createStudent: CreateStudentDto): Promise<string> {
    return this.authService.studentSignUp(createStudent);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.login(authCredentialsDto);
  }
}
