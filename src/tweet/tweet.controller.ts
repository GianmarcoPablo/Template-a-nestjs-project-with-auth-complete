import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from '@prisma/client';
import { ValidosRoles } from 'src/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }

  @Post()
  @Auth(ValidosRoles.user)
  create(
    @Body() createTweetDto: CreateTweetDto,
    @GetUser() user: User
  ) {
    console.log(user)
    return this.tweetService.create(createTweetDto, user);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.tweetService.findAll(paginationDto);
  }

  @Get('by/user')
  @Auth(ValidosRoles.user)
  getTweetsByUser(
    @GetUser() user: User
  ) {
    return this.tweetService.getTweetsByUser(user);
  }

  @Get('by/trends')
  getTweetsByTrends() {
    return this.tweetService.createTrend();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidosRoles.user, ValidosRoles.admin)
  update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetService.update(+id, updateTweetDto);
  }

  @Delete(':id')
  @Auth(ValidosRoles.user, ValidosRoles.admin)
  remove(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    return this.tweetService.remove(id, user);
  }

  @Post('/action/like/:id')
  @Auth(ValidosRoles.user)
  like(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    return this.tweetService.likeTweet(id, user.id);
  }
}
