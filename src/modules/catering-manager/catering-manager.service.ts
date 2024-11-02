import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCateringManagerDto } from './dto/create-catering-manager.dto';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CateringManager } from './entities/catering-manager.entity';
import { Repository } from 'typeorm';
import { UpdateCateringManagerDto } from './dto/update-catering-manager.dto';

@Injectable()
export class CateringManagerService {
  constructor(
    @InjectRepository(CateringManager)
    private readonly cateringManagerRepository: Repository<CateringManager>,
  ) {}

  async findAll(): Promise<CateringManager[]> {
    try {
      return await this.cateringManagerRepository.find();
    } catch (error) {
      console.error('Error fetching catering managers:', error);
      throw new Error('Could not fetch catering managers');
    }
  }

  async findById(id: number): Promise<CateringManager> {
    const cateringManager = await this.cateringManagerRepository.findOne({
      where: { managerId: id },
    });

    if (!cateringManager) {
      throw new NotFoundException(`Catering Manager with id ${id} not found`);
    }

    return cateringManager;
  }

  async addCateringManager(
    createCateringManagerDto: CreateCateringManagerDto,
  ): Promise<SignUpResponse> {
    const cateringManager = this.cateringManagerRepository.create(
      createCateringManagerDto,
    );
    await this.cateringManagerRepository.save(cateringManager);
    return { message: 'Catering Manager Added', success: true };
  }

  async updateCateringManager(
    id: number,
    createCateringManagerDto: UpdateCateringManagerDto,
  ): Promise<SignUpResponse> {
    const cateringManager = await this.cateringManagerRepository.findOne({
      where: { managerId: id },
    });

    if (!cateringManager) {
      throw new NotFoundException(`Catering Manager with id ${id} not found`);
    }

    await this.cateringManagerRepository.update(
      { managerId: id },
      createCateringManagerDto,
    );
    return { message: 'Catering Manager Updated', success: true };
  }

  async deleteCateringManager(id: number): Promise<SignUpResponse> {
    const cateringManager = await this.cateringManagerRepository.findOne({
      where: { managerId: id },
    });

    if (!cateringManager) {
      throw new NotFoundException(`Catering Manager with id ${id} not found`);
    }

    await this.cateringManagerRepository.delete({ managerId: id });
    return { message: 'Catering Manager Deleted', success: true };
  }
}
