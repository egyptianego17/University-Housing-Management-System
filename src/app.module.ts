import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DB_DATABASE: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_PORT: joi.number().default('3306'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (envConfigService: ConfigService) => ({
        type: 'mysql',
        entities: [],
        database: envConfigService.get<string>('DB_DATABASE'),
        username: envConfigService.get<string>('DB_USER'),
        password: envConfigService.get<string>('DB_PASSWORD'),
        port: envConfigService.get<number>('DB_PORT'),
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
