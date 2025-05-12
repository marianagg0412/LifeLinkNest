import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;

  @IsOptional()
  @IsString()
  frequency?: string;

  @IsUUID()
  userId: string;
}
