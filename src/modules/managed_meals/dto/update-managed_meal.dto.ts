import { PartialType } from '@nestjs/swagger';
import { CreateManagedMealDto } from './create-managed_meal.dto';

export class UpdateManagedMealDto extends PartialType(CreateManagedMealDto) {}
