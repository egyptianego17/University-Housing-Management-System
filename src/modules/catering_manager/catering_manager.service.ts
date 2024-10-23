import { Injectable } from '@nestjs/common';
import { CreateCateringManagerDto } from './dto/create-catering_manager.dto';
import { UpdateCateringManagerDto } from './dto/update-catering_manager.dto';

@Injectable()
export class CateringManagerService {
  create(createCateringManagerDto: CreateCateringManagerDto) {
    return 'This action adds a new cateringManager';
  }

  findAll() {
    return `This action returns all cateringManager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cateringManager`;
  }

  update(id: number, updateCateringManagerDto: UpdateCateringManagerDto) {
    return `This action updates a #${id} cateringManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} cateringManager`;
  }
}
