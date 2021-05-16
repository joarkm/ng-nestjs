import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MyUiNotificationHelper } from './services';
import { MyUiNotificationService } from './services/notification.service';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
      // override hammerjs default configuration
      'swipe': {
        direction: Hammer.DIRECTION_ALL
      }
  }
}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HammerModule
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
    MyUiNotificationService,
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig
    }
  ]
})
export class NotificationModule { }
