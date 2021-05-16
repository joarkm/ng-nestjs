import { Component } from '@angular/core';
import { Message } from '@nx-workspace/api-interfaces';
import { MyUiNotificationHelper } from 'my-ui';
import { take } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: Message;

  constructor(private appService: AppService, private notificationHelper: MyUiNotificationHelper) {}

  public useModule(moduleId: number): void {
    this.appService.getDataFromModule(moduleId).pipe(take(1))
      .subscribe(message => { this.data = message; });
  }

  public fireNotifications(): void {
    const notifications = [
      this.notificationHelper.notifySuccess('Success message', 5),
      this.notificationHelper.notifyInfo('Info message', 4),
      this.notificationHelper.notifyWarning('Warning message'),
      this.notificationHelper.notifyError('Error message')
    ];

    notifications.forEach(notification => {
      notification.closed$
        .subscribe(() => { console.error(`notification '${notification.id}' closed`); }
      );
      notification.clicked$
        .subscribe(() => { console.error(`notification '${notification.id}' clicked`); }
      );
    });
  }
}
