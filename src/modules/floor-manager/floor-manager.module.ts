import { Module } from '@nestjs/common';
import { FloorManagerService } from './floor-manager.service';
import { FloorManagerController } from './floor-manager.controller';

@Module({
  controllers: [FloorManagerController],
  providers: [FloorManagerService],
})
export class FloorManagerModule {}
