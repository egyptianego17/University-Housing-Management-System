import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FloorManagerService } from './floor-manager.service';
import { CreateFloorManagerDto } from './dto/create-floor-manager.dto';
import { UpdateFloorManagerDto } from './dto/update-floor-manager.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('floor-manager')
@ApiTags('FloorManager')
export class FloorManagerController {
  constructor(private readonly floorManagerService: FloorManagerService) {}

  @Post()
  create(@Body() createFloorManagerDto: CreateFloorManagerDto) {
    return this.floorManagerService.create(createFloorManagerDto);
  }

  @Get()
  findAll() {
    return this.floorManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floorManagerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFloorManagerDto: UpdateFloorManagerDto,
  ) {
    return this.floorManagerService.update(+id, updateFloorManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floorManagerService.remove(+id);
  }
}