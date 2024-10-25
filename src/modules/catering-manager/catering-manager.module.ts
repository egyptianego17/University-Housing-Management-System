import { Module } from '@nestjs/common';
import { CateringManagerService } from './catering-manager.service';
import { CateringManagerController } from './catering-manager.controller';

@Module({
  controllers: [CateringManagerController],
  providers: [CateringManagerService],
})
export class CateringManagerModule {}
