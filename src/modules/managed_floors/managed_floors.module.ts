import { Module } from '@nestjs/common';
import { ManagedFloorsService } from './managed_floors.service';
import { ManagedFloorsController } from './managed_floors.controller';

@Module({
  controllers: [ManagedFloorsController],
  providers: [ManagedFloorsService],
})
export class ManagedFloorsModule {}
