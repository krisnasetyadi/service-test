import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get databaseUrl(): string {
    console.log('thisss', this.configService);
    return this.configService.get<string>('DATABASE_URL');
  }
}
