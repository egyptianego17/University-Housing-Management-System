import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto'
import { CreateUserAndStudentDto } from './../user/dto/create-student-dto'
import { UserRepository } from './../user/user.repository'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async studentSignUp(createUserAndStudentDto: CreateUserAndStudentDto): Promise<string> {
    return await this.userRepository.studentSignUp(createUserAndStudentDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.login(authCredentialsDto);
  }
}
