import { Injectable } from '@nestjs/common';
import { CreateManagedMealDto } from './dto/create-managed_meal.dto';
import { UpdateManagedMealDto } from './dto/update-managed_meal.dto';

@Injectable()
export class ManagedMealsService {
  create(createManagedMealDto: CreateManagedMealDto) {
    return 'This action adds a new managedMeal';
  }

  findAll() {
    return `This action returns all managedMeals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managedMeal`;
  }

  update(id: number, updateManagedMealDto: UpdateManagedMealDto) {
    return `This action updates a #${id} managedMeal`;
  }

  remove(id: number) {
    return `This action removes a #${id} managedMeal`;
  }
}
