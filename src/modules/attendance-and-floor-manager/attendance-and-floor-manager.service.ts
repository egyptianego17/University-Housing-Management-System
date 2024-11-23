import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ReturnDocument } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttendanceAndFloorManagerDto } from './dto/create-attendance-and-floor-manager.dto';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';
import { AttendanceAndFloorManager } from './entities/attendance-and-floor-manager.entity';
import { UpdateAttendanceAndFloorManagerDto } from './dto/update-attendance-and-floor-manager.dto';

@Injectable()
export class AttendanceAndFloorManagerService {
  constructor(
    @InjectRepository(AttendanceAndFloorManager)
    private repo: Repository<AttendanceAndFloorManager>,
  ) {}

  async create(
    createManagerDto: CreateAttendanceAndFloorManagerDto,
  ): Promise<SignUpResponse> {
    try {
      const manager = this.repo.create(createManagerDto);
      await this.repo.save(manager);
      return { message: 'Manager added successfully!', success: true };
    } catch (err) {
      return {
        message: 'Error adding manager info, try again',
        success: false,
      };
    }
  }

  async findAll() {
    try {
      const managers = await this.repo.find();
      return managers;
    } catch (err) {
      return [];
    }
  }

  async findById(
    managerId: number,
  ): Promise<AttendanceAndFloorManager | undefined> {
    try {
      const manager = await this.repo.findOne({ where: { managerId } });
      if (!manager) {
        throw new NotFoundException(`Manager with id ${managerId} not found`);
      }
      return manager;
    } catch (err) {
      return undefined;
    }
  }

  async update(
    managerId: number,
    updateManagerDto: UpdateAttendanceAndFloorManagerDto,
  ): Promise<SignUpResponse> {
    try {
      // Check if the manager exists first
      const manager = await this.repo.findOne({ where: { managerId } });
      if (!manager) {
        return {
          message: `Manager with id ${managerId} not found`,
          success: false,
        };
      }
      await this.repo.update({ managerId }, updateManagerDto);
      return { message: 'Manager details updated', success: true };
    } catch (err) {
      return { message: 'Error occured, try again!', success: false };
    }
  }

  async delete(managerId: number): Promise<SignUpResponse> {
    try {
      const manager = await this.repo.findOne({ where: { managerId } });
      if (!manager) {
        return {
          message: `Manager with id ${managerId} not found`,
          success: false,
        };
      }
      await this.repo.delete({ managerId });
      return { message: `Manager with id ${managerId} deleted`, success: true };
    } catch (err) {
      return {
        message: `Error deleting manager with id ${managerId}`,
        success: false,
      };
    }
  }
}
