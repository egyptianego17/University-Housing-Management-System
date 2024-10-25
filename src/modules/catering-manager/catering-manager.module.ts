import { Module } from '@nestjs/common';
import { CateringManagerService } from './catering-manager.service';
import { CateringManagerController } from './catering-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CateringManager } from './entities/catering-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CateringManager])],
  controllers: [CateringManagerController],
  providers: [CateringManagerService],
})
export class CateringManagerModule {}
