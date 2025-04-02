import { IsNumber, IsEnum, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsUUID('4', { each: true }) // UUID v4 
  @IsNotEmpty()
  productIds: string[];

  @IsEnum(['PENDING', 'COMPLETED', 'CANCELED'])
  @IsOptional()
  status: 'PENDING' | 'COMPLETED' | 'CANCELED';
}
