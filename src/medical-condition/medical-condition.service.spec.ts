import { Test, TestingModule } from '@nestjs/testing';
import { MedicalConditionService } from './medical-condition.service';

describe('MedicalConditionService', () => {
  let service: MedicalConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalConditionService],
    }).compile();

    service = module.get<MedicalConditionService>(MedicalConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
