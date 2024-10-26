import { PartialType } from '@nestjs/mapped-types';
import { CreateManagedMealDto } from './create-managed-meal.dto';

export class UpdateManagedMealDto extends PartialType(CreateManagedMealDto) {}
