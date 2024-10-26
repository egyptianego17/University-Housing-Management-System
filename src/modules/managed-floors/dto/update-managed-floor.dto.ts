import { PartialType } from '@nestjs/mapped-types';
import { CreateManagedFloorDto } from './create-managed-floor.dto';

export class UpdateManagedFloorDto extends PartialType(CreateManagedFloorDto) {}
