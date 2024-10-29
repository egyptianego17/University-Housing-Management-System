import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateManagedFloorDto } from './dto/create-managed-floor.dto';
import { UpdateManagedFloorDto } from './dto/update-managed-floor.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagedFloor } from './entities/managed-floor.entity';

@Injectable()
export class ManagedFloorsService {
  constructor(
    @InjectRepository(ManagedFloor)
    private readonly repo: Repository<ManagedFloor>,
  ) {}

  async create(
    createManagedFloorDto: CreateManagedFloorDto,
  ): Promise<ManagedFloor> {
    try {
      const managedFloor = this.repo.create(createManagedFloorDto);
      return await this.repo.save(managedFloor);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Managed Floor already exists');
      }
      throw err;
    }
  }

  async findAll(): Promise<ManagedFloor[]> {
    const res = await this.repo.find();
    if (!res.length) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'No managed floors found',
        },
        HttpStatus.NO_CONTENT,
      );
    }
    return res;
  }

  async findOne(managerId: number, floorNumber: number): Promise<ManagedFloor> {
    const managedFloor = await this.repo.findOne({
      where: { managerId: managerId, floorNumber: floorNumber },
    });
    if (!managedFloor) {
      throw new NotFoundException('Managed Floor not found');
    }
    return managedFloor;
  }

  async update(
    managerId: number,
    floorNumber: number,
    updateManagedFloorDto: UpdateManagedFloorDto,
  ) {
    const managedFloor = await this.repo.preload({
      managerId: managerId,
      floorNumber: floorNumber,
      ...updateManagedFloorDto,
    });
    if (!managedFloor) {
      throw new NotFoundException('Managed Floor not found');
    }
    return this.repo.save(managedFloor);
  }

  async remove(managerId: number, floorNumber: number) {
    const managedFloor = await this.repo.findOne({
      where: { managerId: managerId, floorNumber: floorNumber },
    });
    if (!managedFloor) {
      throw new NotFoundException('Managed Floor not found');
    }
    return this.repo.remove(managedFloor);
  }
}
