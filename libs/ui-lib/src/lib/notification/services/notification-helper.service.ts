import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyUiNotificationOptions } from '../interfaces/notification-options.interface';
import { MyUiNotificationType } from '../interfaces/notification-type.interface';
import { MyUiNotification } from '../interfaces/notification.interface';
import { MyUiNotificationService } from './notification.service';


@Injectable()
export class MyUiNotificationHelper {
    private notificationIds: string[] = [];

    public notifications$: Observable<MyUiNotification[]>;

    constructor(private notificationService: MyUiNotificationService) {
      this.notifications$ = this.notificationService.notifications;
    }
    
    public notifyError(message: string, duration: number = null, extraOptions: MyUiNotificationOptions = null): MyUiNotificationWrapped {
        const notification: MyUiNotification = new MyUiNotification(message, MyUiNotificationType.ERROR, { durationInSeconds: duration, ...extraOptions });
        return this.add(notification);
    }

    public notifySuccess(message: string, duration: number = 5, extraOptions: MyUiNotificationOptions = null): MyUiNotificationWrapped {
        const notification: MyUiNotification = new MyUiNotification(message, MyUiNotificationType.SUCCESS, { durationInSeconds: duration, ...extraOptions });
        return this.add(notification);
    }

    public notifyWarning(message: string, duration: number = null, extraOptions: MyUiNotificationOptions = null): MyUiNotificationWrapped {
        const notification: MyUiNotification = new MyUiNotification(message, MyUiNotificationType.WARNING, { durationInSeconds: duration, ...extraOptions });
        return this.add(notification);
    }

    public notifyInfo(message: string, duration: number = 5, extraOptions: MyUiNotificationOptions = null): MyUiNotificationWrapped {
        const notification: MyUiNotification = new MyUiNotification(message, MyUiNotificationType.INFO, { durationInSeconds: duration, ...extraOptions });
        return this.add(notification);
    }

    public notify(message: string, notificationType: MyUiNotificationType = MyUiNotificationType.INFO, duration: number = 5, extraOptions: MyUiNotificationOptions = null): MyUiNotificationWrapped {
        const notification: MyUiNotification = new MyUiNotification(message, notificationType, { durationInSeconds: duration, ...extraOptions });
        return this.add(notification);
    }

    public close(notificationId: string): void {
        this.notificationService.closeNotification(notificationId);
    }

    public clear() {
        this.notificationService.closeNotifications(this.notificationIds);
    }

    public clearNonTemporary() {
        this.notificationService.removeAllNonTemporaryNotifications();
    }

    public clearAll() {
        this.notificationService.removeAllNotifications();
    }

    private add(notification: MyUiNotification): MyUiNotificationWrapped {
        this.notificationIds.push(notification.id);
        return this.notificationService.addNotification(notification);
    }
}

export class MyUiNotificationWrapped {
  public id: string;
  public closed$: Observable<void>;
  public clicked$: Observable<void>;
}