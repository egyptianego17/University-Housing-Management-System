import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FloorManagerService } from './floor-manager.service';
import { CreateFloorManagerDto } from './dto/create-floor-manager.dto';
import { UpdateFloorManagerDto } from './dto/update-floor-manager.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('floor-manager')
@ApiTags('FloorManager')
export class FloorManagerController {
  constructor(private readonly floorManagerService: FloorManagerService) {}

}
