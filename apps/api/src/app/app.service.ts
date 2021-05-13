import { Injectable } from '@nestjs/common';
import { Message } from '@nx-workspace/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  getDataFromModule1(): Message {
    return { message: 'module 1' };
  }

  getDataFromModule2(): Message {
    return { message: 'module 2' };
  }
}
