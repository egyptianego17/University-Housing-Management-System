import { Module } from '@nestjs/common';
import { CateringManagerService } from './catering_manager.service';
import { CateringManagerController } from './catering_manager.controller';

@Module({
  controllers: [CateringManagerController],
  providers: [CateringManagerService],
})
export class CateringManagerModule {}
