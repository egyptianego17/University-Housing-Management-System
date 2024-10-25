import { Test, TestingModule } from '@nestjs/testing';
import { ManagedFloorsService } from './managed-floors.service';

describe('ManagedFloorsService', () => {
  let service: ManagedFloorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagedFloorsService],
    }).compile();

    service = module.get<ManagedFloorsService>(ManagedFloorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
