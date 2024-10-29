import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAndStudentDto } from './../user/dto/create-student-dto'
import { UsePipes } from '@nestjs/common'
import  { AuthCredentialsDto } from './dto/auth-credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createStudentDto: CreateUserAndStudentDto) {
    return this.authService.studentSignUp(createStudentDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }
}
