import { IsString, IsNumber, IsOptional, IsUrl, Min, IsIn } from "class-validator";

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
    use: string;

    @IsString()
    @IsIn(['Ortopedia', 'Cardiología', 'Oftalmología', 'Cirugía Plástica'])
    specialty: string;
}
