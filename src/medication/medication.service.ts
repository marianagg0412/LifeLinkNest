import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
  ) {}

  create(createMedicationDto: CreateMedicationDto) {
    const medication = this.medicationRepository.create(createMedicationDto);
    return this.medicationRepository.save(medication);
  }

  findAll() {
    return this.medicationRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.medicationRepository.findOne({ where: { id }, relations: ['user'] });
  }

  findByUserId(userId: string) {
    return this.medicationRepository.find({ where: { user: { id: userId } } });
  }

  update(id: string, updateMedicationDto: UpdateMedicationDto) {
    return this.medicationRepository.update(id, updateMedicationDto);
  }

  async remove(id: string) {
    const medication = await this.findOne(id);
    return this.medicationRepository.remove(medication);
  }
}
