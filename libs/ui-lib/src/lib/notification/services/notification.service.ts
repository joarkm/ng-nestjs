import { Injectable } from '@angular/core';
import { isNullOrUndefined } from '@nx-workspace/core';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { map, scan, take, takeWhile, tap, finalize } from 'rxjs/operators';
import { MyUiNotification } from '../interfaces/notification.interface';
import { MyUiNotificationWrapped } from './notification-helper.service';

@Injectable({
  providedIn: 'root'
})
export class MyUiNotificationService {

  constructor() { }

  private _notifications: BehaviorSubject<MyUiNotificationWrappedInternal[]> =
    new BehaviorSubject([]);

  get notifications(): Observable<MyUiNotification[]> {
    return this._notifications.asObservable().pipe(
      map((wrappedInternals) => wrappedInternals.map<MyUiNotification>((wrappedInternal) => wrappedInternal.notification))
    );
  }

  public addNotification(notification: MyUiNotification): MyUiNotificationWrapped | null {
    const indexOfExisting = this._notifications
      .getValue()
      .findIndex((n) => n.notification.id === notification.id);
    if (indexOfExisting > -1) {
      return this.updateNotification(notification);
    }
    return this.createNotification(notification);
  }

  public addNotifications(notifications: MyUiNotification[]): (MyUiNotificationWrapped | null)[] {
    const addedNotifications: (MyUiNotificationWrapped | null)[] = [];
    if (!isNullOrUndefined(notifications)) {
      notifications.forEach((notification) =>
        addedNotifications.push(this.addNotification(notification))
      );
    }
    return addedNotifications;
  }

  public emitNotificationClicked(notificationId: string): void {
    const notification = this.getNotification(notificationId);
    if (notification) {
      notification.clickedSource.next();
    }
  }

  private getIndexOfNotification(notificationId: string): number {
    return this._notifications.getValue().findIndex((n) => n.notification.id === notificationId);
  }

  private getNotification(notificationId: string): MyUiNotificationWrappedInternal | undefined {
    return this._notifications.getValue().find((n) => n.notification.id === notificationId);
  }

  public closeNotification(notificationId: string): void {
    const notifications = this._notifications.getValue();
    const index = notifications.findIndex(
      (n) => n.notification.id === notificationId
    );

    if (index > -1) {
      const wrappedNotification = notifications[index];
      const { notification } = wrappedNotification;
      notification.close();
      wrappedNotification.closedSource.next();
      this.tearDownNotification(wrappedNotification);

      setTimeout((_: any[]) => {
        notifications.splice(index, 1);
        this._notifications.next(notifications);
      }, 500);
    }
  }

  public closeNotifications(notificationIds: string[]): void {
    if (!isNullOrUndefined(notificationIds)) {
      notificationIds.forEach((id) => this.closeNotification(id));
    }
  }

  public removeAllNotifications(): void {
    this._notifications.getValue().forEach(wn => {
      wn.closedSource.next();
      this.tearDownNotification(wn);
    });
    this._notifications.next([]);
  }

  public removeAllNonTemporaryNotifications(): void {
    const notificationsToRemove = this._notifications.getValue()
    // .filter((wn) => );
    .filter(({ notification: { options: { durationInSeconds: duration } } }) => duration <= 0 || isNaN(duration));
    notificationsToRemove.forEach(wn => {
      wn.closedSource.next();
      this.tearDownNotification(wn);
    });

    this._notifications.next(this._notifications.getValue()
      .filter(({ notification: { options: { durationInSeconds: duration } } }) => duration && !isNaN(duration) && duration > 0)
    );
  }

  private createNotification(notification: MyUiNotification): MyUiNotificationWrapped {
    const notifications = this._notifications.getValue();

    const wrappedNotification = this.buildNotificationWrappedInternal(notification);
    const createdNotification: MyUiNotificationWrapped = {
      id: notification.id,
      clicked$: wrappedNotification.clickedSource.asObservable(),
      closed$: wrappedNotification.closedSource.asObservable()
    };
    notifications.unshift(wrappedNotification);
    this._notifications.next(notifications);
    this.queueNotificationForRemoval(notification);
    return createdNotification;
  }

  private buildNotificationWrappedInternal(notification: MyUiNotification): MyUiNotificationWrappedInternal {
    return {
      notification,
      clickedSource: new Subject<void>(),
      closedSource: new Subject<void>(),
    };
  }

  private tearDownNotification(wrappedNotification: MyUiNotificationWrappedInternal): void {
    wrappedNotification.clickedSource.complete();
    wrappedNotification.closedSource.complete();
  }

  private updateNotification(notification: MyUiNotification): MyUiNotificationWrapped | null {
    const wrappedNotification = this.getNotification(notification.id);
    const indexOfWrappedNotification = this.getIndexOfNotification(notification.id);

    if (wrappedNotification && indexOfWrappedNotification) {
      const notifications = this._notifications.getValue();
      // Remove the old notification and push the updated one last
      notifications.splice(indexOfWrappedNotification, 1);
      const updatedNotification: MyUiNotificationWrappedInternal = {...wrappedNotification, notification};
      notifications.push(updatedNotification);
      this._notifications.next(notifications);
      return {
        id: notification.id,
        clicked$: updatedNotification.clickedSource.asObservable(),
        closed$: updatedNotification.closedSource.asObservable()
      };
    }
    return null;
  }

  private queueNotificationForRemoval(notification: MyUiNotification): void {
    const duration = notification.options.durationInSeconds;

    if (isNaN(duration) || duration <= 0) {
      return;
    }

    const countDown$ = interval(1000).pipe(
      scan(acc => acc - 1, duration), // Count down by one, starting at duration
      tap((remainingDuration: number) => {
        notification.remainingDurationInSeconds = remainingDuration;
      }),
      takeWhile((remainingDuration: number) => remainingDuration > 0),
      finalize(() => { this.closeNotification(notification.id) })
    );

    countDown$.subscribe();

    // setTimeout(() => this.closeNotification(notification.id), duration * 1000);
  }
}

interface MyUiNotificationWrappedInternal {
  notification: MyUiNotification;
  closedSource: Subject<void>;
  clickedSource: Subject<void>;
}
