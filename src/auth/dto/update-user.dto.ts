/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsBoolean()
    donor?: boolean;

    @IsOptional()
    @IsBoolean()
    recipient?: boolean;
    
    @IsOptional()
    @IsString()
    bloodType?: string;
}

