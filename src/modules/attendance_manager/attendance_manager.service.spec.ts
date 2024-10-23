import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceManagerService } from './attendance_manager.service';

describe('AttendanceManagerService', () => {
  let service: AttendanceManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceManagerService],
    }).compile();

    service = module.get<AttendanceManagerService>(AttendanceManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
