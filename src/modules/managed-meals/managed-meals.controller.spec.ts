import { Test, TestingModule } from '@nestjs/testing';
import { ManagedMealsController } from './managed-meals.controller';
import { ManagedMealsService } from './managed-meals.service';

describe('ManagedMealsController', () => {
  let controller: ManagedMealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagedMealsController],
      providers: [ManagedMealsService],
    }).compile();

    controller = module.get<ManagedMealsController>(ManagedMealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
