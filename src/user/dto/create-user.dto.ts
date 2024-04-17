import { IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    docnum:string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
