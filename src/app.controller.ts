import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpAdapterHost } from '@nestjs/core';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
