import { Injectable } from '@nestjs/common';
import { CreateFloorManagerDto } from './dto/create-floor_manager.dto';
import { UpdateFloorManagerDto } from './dto/update-floor_manager.dto';

@Injectable()
export class FloorManagerService {
  create(createFloorManagerDto: CreateFloorManagerDto) {
    return 'This action adds a new floorManager';
  }

  findAll() {
    return `This action returns all floorManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} floorManager`;
  }

  update(id: number, updateFloorManagerDto: UpdateFloorManagerDto) {
    return `This action updates a #${id} floorManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} floorManager`;
  }
}
