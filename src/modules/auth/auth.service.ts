import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { UserRepository } from './../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
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

  async studentSignUp(
    createStudent: CreateStudentDto,
  ): Promise<SignUpResponse> {
    try {
      const message = await this.userRepository.studentSignUp(createStudent);
      return { message, success: true };
    } catch (error) {
      console.error('Signup error:', error);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Signup failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
    try {
      const user = await this.userRepository.login(authCredentialsDto);
      const payload = await EncryptionUtil.encryptPayload(
        user.email,
        user.role,
      );
      const accessToken = this.jwtService.sign({ encryptedData: payload });
      return { token: accessToken, success: true, role: user.role };
    } catch (error) {
      console.error('Login error:', error);

      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: error.message || 'Login failed',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
