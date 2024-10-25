import { Test, TestingModule } from '@nestjs/testing';
import { FloorManagerService } from './floor-manager.service';

describe('FloorManagerService', () => {
  let service: FloorManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FloorManagerService],
    }).compile();

    service = module.get<FloorManagerService>(FloorManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
