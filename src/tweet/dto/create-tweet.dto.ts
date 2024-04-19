import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTweetDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(280)
    content: string;
}
