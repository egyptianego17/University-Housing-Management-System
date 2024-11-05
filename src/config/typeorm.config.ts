import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class typeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isHosted = this.configService.get<string>('DB_HOSTED') === 'true';

    return {
      type: isHosted ? 'postgres' : 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity.*'],
      synchronize: true,
      logging: true,
      ...(isHosted && {
        ssl: {
          rejectUnauthorized: false, // Set to false if you're using self-signed certificates
        },
      }),
    };
  }
}
