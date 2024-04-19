import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly authService: AuthService
  ) { }

  async runSeed() {
    return "Seed executed!"
  }
}
