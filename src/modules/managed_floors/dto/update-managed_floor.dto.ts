import { PartialType } from '@nestjs/swagger';
import { CreateManagedFloorDto } from './create-managed_floor.dto';

export class UpdateManagedFloorDto extends PartialType(CreateManagedFloorDto) {}
