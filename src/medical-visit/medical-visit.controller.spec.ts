import { Test, TestingModule } from '@nestjs/testing';
import { MedicalVisitController } from './medical-visit.controller';
import { MedicalVisitService } from './medical-visit.service';

describe('MedicalVisitController', () => {
  let controller: MedicalVisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalVisitController],
      providers: [MedicalVisitService],
    }).compile();

    controller = module.get<MedicalVisitController>(MedicalVisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
