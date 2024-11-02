import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  Put,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CateringManagerService } from './catering-manager.service';
import { CreateCateringManagerDto } from './dto/create-catering-manager.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignUpResponse } from '../auth/interfaces/signup-response.interface';
import { ValidationPipe } from '@nestjs/common';
import { UpdateCateringManagerDto } from './dto/update-catering-manager.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/decorators/role.decorator';

@Controller('catering-manager')
@ApiTags('CateringManager')
export class CateringManagerController {
  constructor(
    private readonly cateringManagerService: CateringManagerService,
  ) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ADMIN')
  @Get()
  async getAllCateringManagers() {
    return await this.cateringManagerService.findAll();
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ADMIN')
  @Get(':id')
  async getCateringManagerById(id: number) {
    return await this.cateringManagerService.findById(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ADMIN')
  @Post('add/catering-manager')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async addCateringManager(
    @Body() createCateringManagerDto: CreateCateringManagerDto,
  ): Promise<SignUpResponse> {
    return await this.cateringManagerService.addCateringManager(
      createCateringManagerDto,
    );
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ADMIN')
  @Put(':id')
  async updateCateringManager(
    @Body() createCateringManagerDto: CreateCateringManagerDto,
    @Param('id') id: number,
  ): Promise<SignUpResponse> {
    return await this.cateringManagerService.updateCateringManager(
      id,
      createCateringManagerDto,
    );
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ADMIN')
  @Patch(':id')
  async updateCateringManagerPartial(
    @Body() updateCateringManagerDto: UpdateCateringManagerDto,
    @Param('id') id: number,
  ): Promise<SignUpResponse> {
    return await this.cateringManagerService.updateCateringManager(
      id,
      updateCateringManagerDto,
    );
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Role('ADMIN')
  @Delete(':id')
  async deleteCateringManager(
    @Param('id') id: number,
  ): Promise<SignUpResponse> {
    return await this.cateringManagerService.deleteCateringManager(id);
  }
}
