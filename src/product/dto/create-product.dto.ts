/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  IsIn,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsString()
  @IsIn(['Tejido Blando', 'Tejido Duro', 'Tejido Ocular'])
  category: string;

  @IsString()
  @IsIn([
    'Rehabilitación Ortopédica',
    'Reparación de Heridas',
    'Recuperación Visual',
    'Mejora de la Función Cardíaca',
  ])
  use: string;

  @IsString()
  @IsIn(['Ortopedia', 'Cardiología', 'Oftalmología', 'Cirugía Plástica'])
  specialty: string;

  @IsInt()
  @Min(0)
  stock: number;
}
