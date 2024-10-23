import { Module } from '@nestjs/common';
import { ManagedMealsService } from './managed_meals.service';
import { ManagedMealsController } from './managed_meals.controller';

@Module({
  controllers: [ManagedMealsController],
  providers: [ManagedMealsService],
})
export class ManagedMealsModule {}
