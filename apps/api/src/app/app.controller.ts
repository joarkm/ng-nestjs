import { Controller, Get } from '@nestjs/common';

import { Message } from '@nx-workspace/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('module1')
  getDataFromModule1(): Message {
    return this.appService.getDataFromModule1();
  }

  @Get('module2')
  getDataFromModule2(): Message {
    return this.appService.getDataFromModule2();
  }
}
