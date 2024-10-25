import { Module } from '@nestjs/common';
import { FloorManagerService } from './floor-manager.service';
import { FloorManagerController } from './floor-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorManager } from './entities/floor-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FloorManager])],
  controllers: [FloorManagerController],
  providers: [FloorManagerService],
})
export class FloorManagerModule {}
