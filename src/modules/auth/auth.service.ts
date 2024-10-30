import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto'
import { CreateUserAndStudentDto } from './../user/dto/create-student-dto'
import { UserRepository } from './../user/user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptionUtil } from 'src/utils/encryption.util';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async studentSignUp(createStudent: CreateUserDto & CreateStudentDto): Promise<string> {
    return await this.userRepository.studentSignUp(createStudent);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = await this.userRepository.login(authCredentialsDto);
    const payload = await EncryptionUtil.encryptPayload(user.email, user.role);
    const accessToken = this.jwtService.sign({ encryptedData: payload });

    return accessToken;
  } 
}
