import { Injectable } from '@nestjs/common';
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
