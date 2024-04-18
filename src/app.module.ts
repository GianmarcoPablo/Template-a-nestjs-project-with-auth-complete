import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [AuthModule, SeedModule],
})
export class AppModule { }
