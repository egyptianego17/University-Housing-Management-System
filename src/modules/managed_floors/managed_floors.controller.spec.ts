import { Test, TestingModule } from '@nestjs/testing';
import { ManagedFloorsController } from './managed_floors.controller';
import { ManagedFloorsService } from './managed_floors.service';

describe('ManagedFloorsController', () => {
  let controller: ManagedFloorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagedFloorsController],
      providers: [ManagedFloorsService],
    }).compile();

    controller = module.get<ManagedFloorsController>(ManagedFloorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
