import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceManagerController } from './attendance-manager.controller';
import { AttendanceManagerService } from './attendance-manager.service';

describe('AttendanceManagerController', () => {
  let controller: AttendanceManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceManagerController],
      providers: [AttendanceManagerService],
    }).compile();

    controller = module.get<AttendanceManagerController>(AttendanceManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
