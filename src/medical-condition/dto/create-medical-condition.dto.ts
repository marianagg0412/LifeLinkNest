import { IsString, IsOptional, IsEnum, IsDateString, IsArray } from 'class-validator';

export class CreateMedicalConditionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['Mild', 'Moderate', 'Severe'])
  severity: 'Mild' | 'Moderate' | 'Severe';

  @IsOptional()
  @IsDateString()
  diagnosisDate?: Date;

  @IsOptional()
  @IsArray()
  treatments?: string[];

  @IsEnum(['Active', 'In Remission', 'Resolved'])
  status: 'Active' | 'In Remission' | 'Resolved';

  @IsOptional()
  @IsArray()
  medicationIds?: string[];
  
  @IsOptional()
  @IsArray()
  complications?: string[];

  @IsOptional()
  @IsString()
  healthcareProvider?: string;

  @IsOptional()
  @IsDateString()
  followUpDate?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  userId: string;
}