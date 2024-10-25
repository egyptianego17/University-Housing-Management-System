import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagedFloorsService } from './managed-floors.service';
import { CreateManagedFloorDto } from './dto/create-managed-floor.dto';
import { UpdateManagedFloorDto } from './dto/update-managed-floor.dto';

@Controller('managed-floors')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managedFloorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagedFloorDto: UpdateManagedFloorDto) {
    return this.managedFloorsService.update(+id, updateManagedFloorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managedFloorsService.remove(+id);
  }
}
