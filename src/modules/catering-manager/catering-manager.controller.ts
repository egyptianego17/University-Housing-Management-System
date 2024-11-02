import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { CateringManagerService } from './catering-manager.service';
import { CreateCateringManagerDto } from './dto/create-catering-manager.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';
import { ValidationPipe } from '@nestjs/common';
@Controller('catering-manager')
@ApiTags('CateringManager')
export class CateringManagerController {
  constructor(
    private readonly cateringManagerService: CateringManagerService,
  ) {}

  @Post('add/catering-manager')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async addCateringManager(@Body() createCateringManagerDto: CreateCateringManagerDto ): Promise<SignUpResponse> {
    return await this.cateringManagerService.addCateringManager(createCateringManagerDto);
  }
  
}
