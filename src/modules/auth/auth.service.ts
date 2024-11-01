import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto'
import { CreateUserAndStudentDto } from './../user/dto/create-student-dto'
import { UserRepository } from './../user/user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptionUtil } from '../../utils/encryption.util';
import { SignInResponse } from './interfaces/signin-response.interface';
import { SignUpResponse } from './interfaces/signup-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async studentSignUp(createStudent: CreateStudentDto): Promise<SignUpResponse> {
    try {
      const message = await this.userRepository.studentSignUp(createStudent);
      return { message, success: true };
    } catch (error) {
      return { message: error.message || 'Signup failed', success: false };
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
    try {
      const user = await this.userRepository.login(authCredentialsDto);
      const payload = await EncryptionUtil.encryptPayload(user.email, user.role);
      const accessToken = this.jwtService.sign({ encryptedData: payload });
    } catch (error) {
      return { message: error.message || 'Login failed', success: false };
    }
  } 
}
