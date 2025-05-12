import { Module } from '@nestjs/common';
import { AllergyService } from './allergy.service';
import { AllergyController } from './allergy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Allergy } from './entities/allergy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Allergy, User])],
  controllers: [AllergyController],
  providers: [AllergyService],
})
export class AllergyModule {}
