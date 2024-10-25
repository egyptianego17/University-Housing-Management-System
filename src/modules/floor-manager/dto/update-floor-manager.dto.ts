import { PartialType } from '@nestjs/mapped-types';
import { CreateFloorManagerDto } from './create-floor-manager.dto';

export class UpdateFloorManagerDto extends PartialType(CreateFloorManagerDto) {}
