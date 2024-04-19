import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';



export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    isPremiun?: boolean;

    @IsOptional()
    @IsString()
    role: string[];

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}