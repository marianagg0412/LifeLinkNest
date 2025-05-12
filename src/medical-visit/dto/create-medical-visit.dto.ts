import { IsString, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateMedicalVisitDto {
  @IsDateString()
  visitDate: Date;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID()
  userId: string;
}
