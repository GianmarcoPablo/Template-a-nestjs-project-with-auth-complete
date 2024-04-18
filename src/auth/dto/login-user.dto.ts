import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class LoginUserDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}