import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MyUiNotificationHelper } from './services';
import { MyUiNotificationService } from './services/notification.service';


@NgModule({
  imports: [
    CommonModule
    BrowserAnimationsModule,
  ],
  declarations: [
    NotificationComponent,
    NotificationsComponent
  ],
  exports: [
    NotificationComponent,
    NotificationsComponent
  ],
  providers: [
    MyUiNotificationHelper,
    MyUiNotificationService
  ]
})
export class NotificationModule { }
