import { Controller, Get, Post, Body } from '@nestjs/common';
import { ManagedFloorsService } from './managed-floors.service';
import { CreateManagedFloorDto } from './dto/create-managed-floor.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('managed-floors')
@ApiTags('ManagedFloors')
export class ManagedFloorsController {
  constructor(private readonly managedFloorsService: ManagedFloorsService) {}

  @Post()
  create(@Body() createManagedFloorDto: CreateManagedFloorDto) {
    return this.managedFloorsService.create(createManagedFloorDto);
  }

  @Get()
  findAll() {
    return this.managedFloorsService.findAll();
  }
}
