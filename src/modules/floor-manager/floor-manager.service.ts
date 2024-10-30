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

}
