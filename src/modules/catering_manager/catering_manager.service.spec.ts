import { Test, TestingModule } from '@nestjs/testing';
import { CateringManagerService } from './catering_manager.service';

describe('CateringManagerService', () => {
  let service: CateringManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CateringManagerService],
    }).compile();

    service = module.get<CateringManagerService>(CateringManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
