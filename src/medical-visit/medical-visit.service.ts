import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMedicalVisitDto } from "./dto/create-medical-visit.dto";
import { UpdateMedicalVisitDto } from "./dto/update-medical-visit.dto";
import { MedicalVisit } from "./entities/medical-visit.entity";

@Injectable()
export class MedicalVisitService {
  constructor(
    @InjectRepository(MedicalVisit)
    private readonly medicalVisitRepository: Repository<MedicalVisit>,
  ) {}

  create(createMedicalVisitDto: CreateMedicalVisitDto) {
    const visit = this.medicalVisitRepository.create(createMedicalVisitDto);
    return this.medicalVisitRepository.save(visit);
  }

  findAll() {
    return this.medicalVisitRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.medicalVisitRepository.findOne({ where: { id }, relations: ['user'] });
  }

  findByUserId(userId: string) {
    return this.medicalVisitRepository.find({ where: { user: { id: userId } } });
  }

  update(id: string, updateMedicalVisitDto: UpdateMedicalVisitDto) {
    return this.medicalVisitRepository.update(id, updateMedicalVisitDto);
  }

  async remove(id: string) {
    const visit = await this.findOne(id);
    return this.medicalVisitRepository.remove(visit);
  }
}
