import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsePipes } from '@nestjs/common'
import  { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createStudent: CreateUserDto & CreateStudentDto ) {
    return this.authService.studentSignUp(createStudent);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.login(authCredentialsDto);
  }
}
