import { Controller } from '@nestjs/common';
import { FloorManagerService } from './floor-manager.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('floor-manager')
@ApiTags('FloorManager')
export class FloorManagerController {
  constructor(private readonly floorManagerService: FloorManagerService) {}
}
