import { Test, TestingModule } from '@nestjs/testing';
import { ManagedMealsService } from './managed_meals.service';

describe('ManagedMealsService', () => {
  let service: ManagedMealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagedMealsService],
    }).compile();

    service = module.get<ManagedMealsService>(ManagedMealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
