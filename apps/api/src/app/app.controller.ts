import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Message } from '@nx-workspace/api-interfaces';

import { AppService } from './app.service';

@ApiTags('app')
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
  @HttpCode(401)
  getDataFromModule2(): Message {
    return this.appService.getDataFromModule2();
  }
}
