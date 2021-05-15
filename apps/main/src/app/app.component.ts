import { Component } from '@angular/core';
import { Message } from '@nx-workspace/api-interfaces';
import { take } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: Message;

  constructor(private appService: AppService) {}

  public useModule(moduleId: number): void {
    this.appService.getDataFromModule(moduleId).pipe(take(1))
      .subscribe(message => { this.data = message; });
  }
}
