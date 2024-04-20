import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrendService } from 'src/trend/trend.service';

@Module({
  controllers: [TweetController],
  providers: [TweetService, PrismaService, TrendService],
})
export class TweetModule { }
