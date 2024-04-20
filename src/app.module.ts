import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { TweetModule } from './tweet/tweet.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TrendModule } from './trend/trend.module';
import { CommentModule } from './comment/comment.module';
import { ProfileModule } from './profile/profile.module';

@Module({

  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    SeedModule,
    TweetModule,
    CommonModule,
    TrendModule,
    CommentModule,
    ProfileModule
  ],
})
export class AppModule { }
