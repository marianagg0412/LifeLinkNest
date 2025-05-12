import { Module } from '@nestjs/common';
import { MedicalVisitService } from './medical-visit.service';
import { MedicalVisitController } from './medical-visit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { MedicalVisit } from './entities/medical-visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalVisit, User])],
  controllers: [MedicalVisitController],
  providers: [MedicalVisitService],
})
export class MedicalVisitModule {}
