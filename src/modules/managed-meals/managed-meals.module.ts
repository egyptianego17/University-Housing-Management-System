import { Module } from '@nestjs/common';
import { ManagedMealsService } from './managed-meals.service';
import { ManagedMealsController } from './managed-meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagedMeal } from './entities/managed-meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagedMeal])],
  controllers: [ManagedMealsController],
  providers: [ManagedMealsService],
})
export class ManagedMealsModule {}
