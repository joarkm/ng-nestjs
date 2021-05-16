import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MyUiNotificationType } from '../../interfaces/notification-type.interface';

@Component({
  selector: 'my-ui-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  @Input() message: string;
  @Input() notificationType: MyUiNotificationType;
  @Input() totalDuration: number;
  @Input() remainingDuration: number;
  @Input() automaticallyCloses: boolean;
  @Input() closeOnClick: boolean;
  @Input() isClosing: boolean;

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  public NotificationType = MyUiNotificationType

  public close(e: MouseEvent | TouchEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.closed.emit();
  }

}
