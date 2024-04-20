import { Module } from '@nestjs/common';
import { TrendService } from './trend.service';
import { TrendController } from './trend.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TrendController],
  providers: [TrendService, PrismaService],
  exports: [TrendService]
})
export class TrendModule { }
