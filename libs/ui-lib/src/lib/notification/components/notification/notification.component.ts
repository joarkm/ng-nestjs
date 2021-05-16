import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MyUiNotificationType } from '../../interfaces/notification-type.interface';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import { slideOutLeft, slideOutRight } from './keyframes';

@Component({
  selector: 'my-ui-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('notificationAnimator', [
      transition('* => slideOutLeft', animate(1000, keyframes(slideOutLeft))),
      transition('* => slideOutRight', animate(1000, keyframes(slideOutRight)))
    ])
  ]
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
  public animationState = '';

  public close(e: MouseEvent | TouchEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.closed.emit();
    this.startAnimation('slideOutRight');
  }

  startAnimation(state: string): void {
    console.error(`starting animation ${state}`);
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(): void {
    this.animationState = '';
  }

}
