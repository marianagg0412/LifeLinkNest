import { Module } from '@nestjs/common';
import { MedicalConditionService } from './medical-condition.service';
import { MedicalConditionController } from './medical-condition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalCondition } from './entities/medical-condition.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCondition, User])],
  controllers: [MedicalConditionController],
  providers: [MedicalConditionService],
})
export class MedicalConditionModule {}
