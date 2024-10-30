import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from '../student/entities/student.entity';
import { CreateUserAndStudentDto } from './dto/create-student-dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { HashUtil } from '../../utils/hash.util'
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async studentSignUp(createUserAndStudentDto: CreateStudentDto & CreateUserDto): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
 
    const isExist = await queryRunner.manager.findOne(User, { where: { email: createUserAndStudentDto.email } });
      
    if (isExist) {
      throw new ConflictException(`User with email '${createUserAndStudentDto.email}' already exists.`);
    }

    try {


      const user = new User();
      Object.assign(user, createUserAndStudentDto); 
      const { hashedPassword, salt } = await HashUtil.hashPassword(user.password);
      user.password = hashedPassword;
      user.salt = salt;
      const savedUser = await queryRunner.manager.save(user);

      const student = new Student();
      student.user = savedUser; 
      Object.assign(student, createUserAndStudentDto); 
      await queryRunner.manager.save(student);

      await queryRunner.commitTransaction();
      return "User created successfully";
      
    } catch (err) {

      await queryRunner.rollbackTransaction();

      throw new ConflictException('Error while signing up student.', err);

    } finally {

      await queryRunner.release();
    }
  }
  
  async findOneByEmail(email: string): Promise<User> {
    const foundUser = await this.findOne({ where: { email } });
    if (!foundUser) {
      throw new NotFoundException(`User with email '${email}' not found.`);
    }
    return foundUser;
  }

  async findOneById(id: number): Promise<User> {
    const foundUser = await this.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return foundUser;
  }

  async findOneByMobileNumber(mobileNumber: string): Promise<User> {
    const foundUser = await this.findOne({ where: { mobileNumber } });
    if (!foundUser) {
      throw new NotFoundException(`User with mobile number '${mobileNumber}' not found.`);
    }
    return foundUser;
  }

  async activateUser(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (user.isActivated) {
      throw new ConflictException(`User with ID ${id} is already activated.`);
    }
    user.isActivated = true;
    return await this.save(user);
  }

  async deactivateUser(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (!user.isActivated) {
      throw new ConflictException(`User with ID ${id} is already deactivated.`);
    }
    user.isActivated = false;
    return await this.save(user);
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    await this.remove(user);
  }

  async deleteUserByEmail(email: string): Promise<void> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found.`);
    }
    await this.remove(user);
  }
  
  async deleteUserByMobileNumber(mobileNumber: string): Promise<void> {
    const user = await this.findOneByMobileNumber(mobileNumber);
    if (!user) {
      throw new NotFoundException(`User with mobile number '${mobileNumber}' not found.`);
    }
    await this.remove(user);
  }
  
  async login(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found.`);
    }
    const isPasswordValid = await HashUtil.comparePassword(password, user.password, user.salt);
    if (isPasswordValid) {
      console.log(user);
      console.log('Login successful');
    }
    else {
      throw new NotFoundException(`Invalid credentials.`);
    }
    return user;
  } 
}
