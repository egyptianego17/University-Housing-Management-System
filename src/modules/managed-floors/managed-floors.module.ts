import { Module } from '@nestjs/common';
import { ManagedFloorsService } from './managed-floors.service';
import { ManagedFloorsController } from './managed-floors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagedFloor } from './entities/managed-floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagedFloor])],
  controllers: [ManagedFloorsController],
  providers: [ManagedFloorsService],
})
export class ManagedFloorsModule {}
