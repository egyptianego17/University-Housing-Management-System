import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

const mockUserRepository = () => ({
  studentSignUp: jest.fn(),
  login: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(() => 'mockToken'),
};

const mockLoginResponse = {
  id: '1',
  password: '$2b$10$QTrmfYs70z53EFwy.SoKg.CRSsozTjK1alUC.Q3AZaEisL4LEgJ.a',
  salt: '$2b$10$QTrmfYs70z53EFwy.SoKg.',
  firstName: 'John',
  middleName: 'Michael.',
  lastName: 'Doe',
  email: 'example@gmail.com',
  gender: 'MALE',
  birthDate: new Date('2000-01-01'),
  mobileNumber: '01234567890',
  nationalId: '30208170102651',
  nationalIdImageUrl: 'https://example.com/image.jpg',
  section: 'HYBRID',
  isActivated: false,
  role: 'STUDENT',
  student: null,
};

const mockStudent: CreateStudentDto & CreateUserDto = {
  password: 'abcdfe:D001',
  firstName: 'John',
  middleName: 'Michael',
  lastName: 'Doe',
  email: 'example@gmail.com',
  gender: 'MALE',
  birthDate: new Date('2000-01-01'),
  mobileNumber: '01234567890',
  nationalId: '30308070102050',
  nationalIdImageUrl: 'https://example.com/image.jpg',
  section: 'HYBRID',
  address: '123 Main St, City, Country',
  faculty: 'Engineering',
  grade: 85,
  lastYearAcademicGrade: 90,
  disability: false,
  studentIdImageUrl: 'https://example.com/student_id.jpg',
  room: 20,
  floor: 2,
};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: ReturnType<typeof mockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call userRepository.studentSignUp and userRepository.login', async () => {
    userRepository.studentSignUp.mockResolvedValue('User created successfully');
    userRepository.login.mockResolvedValue(mockLoginResponse);

    const result = await service.studentSignUp(mockStudent);
    expect(userRepository.studentSignUp).toHaveBeenCalled();
    expect(result).toEqual('User created successfully');

    const token = await service.login({
      email: mockStudent.email,
      password: mockStudent.password,
    });
    expect(userRepository.login).toHaveBeenCalled();
    expect(token).toEqual(expect.any(String));
  });
});
