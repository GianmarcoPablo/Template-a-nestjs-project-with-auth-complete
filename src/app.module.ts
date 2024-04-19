import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { TweetModule } from './tweet/tweet.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({

  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    SeedModule,
    TweetModule,
    CommonModule
  ],
})
export class AppModule { }
