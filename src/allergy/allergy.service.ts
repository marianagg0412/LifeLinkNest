import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allergy } from './entities/allergy.entity';
import { Repository } from 'typeorm';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

@Injectable()
export class AllergyService {
  constructor(
    @InjectRepository(Allergy)
    private readonly allergyRepository: Repository<Allergy>,
  ) {}

  create(createAllergyDto: CreateAllergyDto) {
    const allergy = this.allergyRepository.create(createAllergyDto);
    return this.allergyRepository.save(allergy);
  }

  findAll() {
    return this.allergyRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.allergyRepository.findOne({ where: { id }, relations: ['user'] });
  }

  findByUserId(userId: string) {
    return this.allergyRepository.find({ where: { user: { id: userId } } });
  }

  update(id: string, updateAllergyDto: UpdateAllergyDto) {
    return this.allergyRepository.update(id, updateAllergyDto);
  }

  async remove(id: string) {
    const allergy = await this.findOne(id);
    return this.allergyRepository.remove(allergy);
  }
}
