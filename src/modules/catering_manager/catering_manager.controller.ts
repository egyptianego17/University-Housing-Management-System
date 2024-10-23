import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CateringManagerService } from './catering_manager.service';
import { CreateCateringManagerDto } from './dto/create-catering_manager.dto';
import { UpdateCateringManagerDto } from './dto/update-catering_manager.dto';

@Controller('catering-manager')
export class CateringManagerController {
  constructor(private readonly cateringManagerService: CateringManagerService) {}

  @Post()
  create(@Body() createCateringManagerDto: CreateCateringManagerDto) {
    return this.cateringManagerService.create(createCateringManagerDto);
  }

  @Get()
  findAll() {
    return this.cateringManagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cateringManagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCateringManagerDto: UpdateCateringManagerDto) {
    return this.cateringManagerService.update(+id, updateCateringManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cateringManagerService.remove(+id);
  }
}
