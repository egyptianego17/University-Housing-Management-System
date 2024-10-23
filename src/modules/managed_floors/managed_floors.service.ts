import { Injectable } from '@nestjs/common';
import { CreateManagedFloorDto } from './dto/create-managed_floor.dto';
import { UpdateManagedFloorDto } from './dto/update-managed_floor.dto';

@Injectable()
export class ManagedFloorsService {
  create(createManagedFloorDto: CreateManagedFloorDto) {
    return 'This action adds a new managedFloor';
  }

  findAll() {
    return `This action returns all managedFloors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managedFloor`;
  }

  update(id: number, updateManagedFloorDto: UpdateManagedFloorDto) {
    return `This action updates a #${id} managedFloor`;
  }

  remove(id: number) {
    return `This action removes a #${id} managedFloor`;
  }
}
