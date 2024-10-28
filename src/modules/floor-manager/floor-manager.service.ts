import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFloorManagerDto } from './dto/create-floor-manager.dto';
import { UpdateFloorManagerDto } from './dto/update-floor-manager.dto';
import { Repository } from 'typeorm';
import { FloorManager } from './entities/floor-manager.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FloorManagerService {
  constructor(
    @InjectRepository(FloorManager)
    private readonly repo: Repository<FloorManager>,
  ) {}

  async create(
    createFloorManagerDto: CreateFloorManagerDto,
  ): Promise<FloorManager> {
    try {
      const floorManager = this.repo.create(createFloorManagerDto);
      return await this.repo.save(floorManager);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Floor Manager already exists');
      }
      throw err; // Re-throw other errors for handling upstream
    }
  }

  async findAll(): Promise<FloorManager[]> {
    const res = await this.repo.find();
    if (!res.length) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: 'No floor managers found',
        },
        HttpStatus.NO_CONTENT,
      );
    }
    return res; // Return the list of floor managers
  }

  async findOne(id: number): Promise<FloorManager> {
    const floorManager = await this.repo.findOne({ where: { managerId: id } });
    if (!floorManager) {
      throw new NotFoundException('Floor Manager not found');
    }
    return floorManager;
  }

  async update(id: number, updateFloorManagerDto: UpdateFloorManagerDto) {
    const floorManager = await this.repo.preload({
      managerId: id,
      ...updateFloorManagerDto,
    });
    if (!floorManager) {
      throw new NotFoundException('Floor Manager not found');
    }
    return await this.repo.save(floorManager);
  }

  async remove(id: number): Promise<FloorManager> {
    const floorManager = await this.repo.findOne({ where: { managerId: id } });
    if (!floorManager) {
      throw new NotFoundException('Floor Manager not found');
    }
    return this.repo.remove(floorManager);
  }
}
