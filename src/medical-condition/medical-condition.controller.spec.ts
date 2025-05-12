import { Test, TestingModule } from '@nestjs/testing';
import { MedicalConditionController } from './medical-condition.controller';
import { MedicalConditionService } from './medical-condition.service';

describe('MedicalConditionController', () => {
  let controller: MedicalConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalConditionController],
      providers: [MedicalConditionService],
    }).compile();

    controller = module.get<MedicalConditionController>(MedicalConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
