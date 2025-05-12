import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalVisitDto } from './create-medical-visit.dto';

export class UpdateMedicalVisitDto extends PartialType(CreateMedicalVisitDto) {}
