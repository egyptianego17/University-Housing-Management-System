import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const newStudent = this.studentRepo.create(createStudentDto);
      return await this.studentRepo.save(newStudent);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new student');
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      return await this.studentRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve students');
    }
  }

  async findOne(studentId: number): Promise<Student> {
    try {
      const student = await this.studentRepo.findOne({ where: { studentId } });
      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found`);
      }
      return student;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve the student');
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    try {
      const student = await this.findOne(id);
      const updatedStudent = Object.assign(student, updateStudentDto);
      return await this.studentRepo.save(updatedStudent);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update the student');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const student = await this.findOne(id);
      await this.studentRepo.remove(student);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to remove the student');
    }
  }
}
