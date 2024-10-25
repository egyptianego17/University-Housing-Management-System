import { Test, TestingModule } from '@nestjs/testing';
import { CateringManagerController } from './catering-manager.controller';
import { CateringManagerService } from './catering-manager.service';

describe('CateringManagerController', () => {
  let controller: CateringManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CateringManagerController],
      providers: [CateringManagerService],
    }).compile();

    controller = module.get<CateringManagerController>(CateringManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
