import { Test, TestingModule } from '@nestjs/testing';
import { FloorManagerController } from './floor_manager.controller';
import { FloorManagerService } from './floor_manager.service';

describe('FloorManagerController', () => {
  let controller: FloorManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloorManagerController],
      providers: [FloorManagerService],
    }).compile();

    controller = module.get<FloorManagerController>(FloorManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
