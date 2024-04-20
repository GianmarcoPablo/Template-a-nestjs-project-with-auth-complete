import { IsString, MaxLength, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    content: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    tweetId: string;
}
