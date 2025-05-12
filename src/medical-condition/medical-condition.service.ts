import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MedicalCondition } from './entities/medical-condition.entity';
import { CreateMedicalConditionDto } from './dto/create-medical-condition.dto';
import { UpdateMedicalConditionDto } from './dto/update-medical-condition.dto';
import { User } from 'src/auth/entities/user.entity';
import { Medication } from 'src/medication/entities/medication.entity';

@Injectable()
export class MedicalConditionService {
  constructor(
    @InjectRepository(MedicalCondition)
    private readonly medicalConditionRepository: Repository<MedicalCondition>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateMedicalConditionDto): Promise<MedicalCondition> {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    let medications: Medication[] = [];
    if (dto.medicationIds && dto.medicationIds.length > 0) {
      medications = await this.medicalConditionRepository.manager.find(Medication, {
        where: { id: In(dto.medicationIds) },
      });
    }

    const { userId, medicationIds, ...rest } = dto;

    const condition = this.medicalConditionRepository.create({
      ...rest,
      user,
      medications,
    });

    return this.medicalConditionRepository.save(condition);
  }

  findAll(): Promise<MedicalCondition[]> {
    return this.medicalConditionRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<MedicalCondition> {
    const condition = await this.medicalConditionRepository.findOne({ where: { id }, relations: ['user'] });
    if (!condition) throw new NotFoundException('Medical condition not found');
    return condition;
  }

  async findByUser(userId: string): Promise<MedicalCondition[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.medicalConditionRepository.find({ where: { user }, relations: ['user'] });
  }

  async update(id: string, dto: UpdateMedicalConditionDto): Promise<MedicalCondition> {
    const condition = await this.findOne(id);
    Object.assign(condition, dto);
    return this.medicalConditionRepository.save(condition);
  }

  async remove(id: string): Promise<void> {
    const condition = await this.findOne(id);
    await this.medicalConditionRepository.remove(condition);
  }
}