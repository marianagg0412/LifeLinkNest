import { IsString, IsUUID } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  name: string;

  @IsString()
  reaction: string;

  @IsUUID()
  userId: string;
}
