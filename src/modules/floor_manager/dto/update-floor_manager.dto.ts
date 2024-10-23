import { PartialType } from '@nestjs/swagger';
import { CreateFloorManagerDto } from './create-floor_manager.dto';

export class UpdateFloorManagerDto extends PartialType(CreateFloorManagerDto) {}
