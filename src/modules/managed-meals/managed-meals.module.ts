import { Module } from '@nestjs/common';
import { ManagedMealsService } from './managed-meals.service';
import { ManagedMealsController } from './managed-meals.controller';

@Module({
  controllers: [ManagedMealsController],
  providers: [ManagedMealsService],
})
export class ManagedMealsModule {}
