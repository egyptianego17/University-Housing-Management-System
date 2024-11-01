import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from '../student/entities/student.entity';
import { CreateUserAndStudentDto } from './dto/create-student-dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { HashUtil } from '../../utils/hash.util';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');
  
  constructor(
    private dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async studentSignUp(createUserAndStudentDto: CreateStudentDto & CreateUserDto): Promise<string> {
    this.logger.log(`Starting student sign-up process for email: ${createUserAndStudentDto.email}`);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    this.logger.debug(`Transaction started for email: ${createUserAndStudentDto.email}`);

    const isExist = await queryRunner.manager.findOne(User, { where: { email: createUserAndStudentDto.email } });
      
    if (isExist) {
      this.logger.warn(`User with email '${createUserAndStudentDto.email}' already exists.`);
      throw new ConflictException(`User with email '${createUserAndStudentDto.email}' already exists.`);
    }

    try {
      const user = new User();
      Object.assign(user, createUserAndStudentDto); 
      this.logger.debug(`Hashing password for email: ${createUserAndStudentDto.email}`);
      
      const { hashedPassword, salt } = await HashUtil.hashPassword(user.password);
      user.password = hashedPassword;
      user.salt = salt;
      const savedUser = await queryRunner.manager.save(user);
      this.logger.debug(`User saved with email: ${createUserAndStudentDto.email}`);

      const student = new Student();
      student.user = savedUser; 
      Object.assign(student, createUserAndStudentDto); 
      const savedStudent = await queryRunner.manager.save(student);
      this.logger.debug(`Student entity saved for email: ${createUserAndStudentDto.email}`);

      savedUser.student = savedStudent;
      await queryRunner.manager.save(savedUser);

      await queryRunner.commitTransaction();
      this.logger.log(`User sign-up successful for email: ${createUserAndStudentDto.email}`);
      return "User created successfully";
      
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Transaction rolled back due to error during sign-up for email: ${createUserAndStudentDto.email}`, err.stack);
      throw new ConflictException('Error while signing up student.', err);

    } finally {
      await queryRunner.release();
      this.logger.debug(`Transaction released for email: ${createUserAndStudentDto.email}`);
    }
  }
  
  async findOneByEmail(email: string): Promise<User> {
    this.logger.log(`Searching for user with email: ${email}`);
    const foundUser = await this.findOne({ where: { email } });
    if (!foundUser) {
      this.logger.warn(`User with email '${email}' not found.`);
      throw new NotFoundException(`User with email '${email}' not found.`);
    }
    return foundUser;
  }

  async findOneById(id: number): Promise<User> {
    this.logger.log(`Searching for user with ID: ${id}`);
    const foundUser = await this.findOne({ where: { id } });
    if (!foundUser) {
      this.logger.warn(`User with ID ${id} not found.`);
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return foundUser;
  }

  async findOneByMobileNumber(mobileNumber: string): Promise<User> {
    this.logger.log(`Searching for user with mobile number: ${mobileNumber}`);
    const foundUser = await this.findOne({ where: { mobileNumber } });
    if (!foundUser) {
      this.logger.warn(`User with mobile number '${mobileNumber}' not found.`);
      throw new NotFoundException(`User with mobile number '${mobileNumber}' not found.`);
    }
    return foundUser;
  }

  async activateUser(id: number): Promise<User> {
    this.logger.log(`Activating user with ID: ${id}`);
    const user = await this.findOneById(id);
    if (user.isActivated) {
      this.logger.warn(`User with ID ${id} is already activated.`);
      throw new ConflictException(`User with ID ${id} is already activated.`);
    }
    user.isActivated = true;
    this.logger.debug(`User with ID ${id} activated.`);
    return await this.save(user);
  }

  async deactivateUser(id: number): Promise<User> {
    this.logger.log(`Deactivating user with ID: ${id}`);
    const user = await this.findOneById(id);
    if (!user.isActivated) {
      this.logger.warn(`User with ID ${id} is already deactivated.`);
      throw new ConflictException(`User with ID ${id} is already deactivated.`);
    }
    user.isActivated = false;
    this.logger.debug(`User with ID ${id} deactivated.`);
    return await this.save(user);
  }

  async deleteUserById(id: number): Promise<void> {
    this.logger.log(`Deleting user with ID: ${id}`);
    const user = await this.findOneById(id);
    if (!user) {
      this.logger.warn(`User with ID ${id} not found.`);
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    await this.remove(user);
    this.logger.log(`User with ID ${id} deleted.`);
  }

  async deleteUserByEmail(email: string): Promise<void> {
    this.logger.log(`Deleting user with email: ${email}`);
    const user = await this.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`User with email '${email}' not found.`);
      throw new NotFoundException(`User with email '${email}' not found.`);
    }
    await this.remove(user);
    this.logger.log(`User with email ${email} deleted.`);
  }
  
  async deleteUserByMobileNumber(mobileNumber: string): Promise<void> {
    this.logger.log(`Deleting user with mobile number: ${mobileNumber}`);
    const user = await this.findOneByMobileNumber(mobileNumber);
    if (!user) {
      this.logger.warn(`User with mobile number '${mobileNumber}' not found.`);
      throw new NotFoundException(`User with mobile number '${mobileNumber}' not found.`);
    }
    await this.remove(user);
    this.logger.log(`User with mobile number ${mobileNumber} deleted.`);
  }
  
  async login(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    this.logger.log(`User attempting login with email: ${email}`);
    const user = await this.findOneByEmail(email);
    
    const isPasswordValid = await HashUtil.comparePassword(password, user.password, user.salt);
    if (isPasswordValid) {
      this.logger.log(`User ${email} logged in successfully.`);
      return user;
    } else {
      this.logger.warn(`Invalid credentials provided for email: ${email}`);
      throw new NotFoundException(`Invalid credentials.`);
    }
  } 
}
