import { Module } from '@nestjs/common';
import { FloorManagerService } from './floor_manager.service';
import { FloorManagerController } from './floor_manager.controller';

@Module({
  controllers: [FloorManagerController],
  providers: [FloorManagerService],
})
export class FloorManagerModule {}
