import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagedMealsService } from './managed-meals.service';
import { CreateManagedMealDto } from './dto/create-managed-meal.dto';
import { UpdateManagedMealDto } from './dto/update-managed-meal.dto';

@Controller('managed-meals')
export class ManagedMealsController {
  constructor(private readonly managedMealsService: ManagedMealsService) {}

  @Post()
  create(@Body() createManagedMealDto: CreateManagedMealDto) {
    return this.managedMealsService.create(createManagedMealDto);
  }

  @Get()
  findAll() {
    return this.managedMealsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managedMealsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagedMealDto: UpdateManagedMealDto) {
    return this.managedMealsService.update(+id, updateManagedMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managedMealsService.remove(+id);
  }
}
