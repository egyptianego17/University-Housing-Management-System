import { Module } from '@nestjs/common';
import { ManagedFloorsService } from './managed-floors.service';
import { ManagedFloorsController } from './managed-floors.controller';

@Module({
  controllers: [ManagedFloorsController],
  providers: [ManagedFloorsService],
})
export class ManagedFloorsModule {}
