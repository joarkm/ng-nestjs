import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyUiNotification } from '../../interfaces/notification.interface';
import { MyUiNotificationHelper } from '../../services/notification-helper.service';
import { MyUiNotificationService } from '../../services/notification.service';

@Component({
  selector: 'my-ui-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications: MyUiNotification[];
  private subscriptions: Subscription = new Subscription();
  constructor(
      private notificationHelper: MyUiNotificationHelper,
      private notificationService: MyUiNotificationService
  ) {
      this.subscriptions.add(
          this.notificationHelper.notifications$.subscribe(notifications =>  this.notifications = notifications)
      );
  }

  ngOnInit() { }

  public onNotificationClose(notificationId: string): void {
      this.notificationHelper.close(notificationId);
  }

  public onNotificationClicked(e: MouseEvent | TouchEvent | KeyboardEvent, index: number): void {
      e.preventDefault();
      e.stopPropagation();
      const notification = this.notifications[index];
      this.notificationService.emitNotificationClicked(notification.id);
      if (notification && notification.options.closeOnClick) {
          this.notificationHelper.close(notification.id);
      }
  }

}
