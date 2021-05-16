import { MyUiNotificationOptions } from './notification-options.interface';
import { MyUiNotificationType } from './notification-type.interface';

import { isNullOrUndefined, UuidHelper } from '@nx-workspace/core'

export class MyUiNotification {
  public id: string;
  public message: string;
  public remainingDurationInSeconds?: number;
  public automaticallyCloses: boolean;
  public type: MyUiNotificationType;
  public options: MyUiNotificationOptions;
  public isClosing = false;

  constructor(
    message: string,
    notificationType: MyUiNotificationType,
    options: MyUiNotificationOptions = {}
  ) {
    this.id = UuidHelper.generate();
    this.message = message;
    this.type = notificationType;
    this.options = this.verifyOptions(options);
  }

  public close(): void {
    this.isClosing = true;
  }

  private verifyOptions(options: MyUiNotificationOptions): MyUiNotificationOptions {
    const defaultOptions: MyUiNotificationOptions = {
      durationInSeconds: 0,
      isClosable: true,
      closeOnClick: false
    };

    Object.keys(defaultOptions).forEach(key => {
      if (!options.hasOwnProperty(key)) {
        options[key] = defaultOptions[key];
      }
    });

    if (options.durationInSeconds < 0) {
        options.durationInSeconds = 0;
    }

    this.automaticallyCloses = !isNullOrUndefined(options.durationInSeconds) && options.durationInSeconds !== 0;
    this.remainingDurationInSeconds = options.durationInSeconds > 0 ? options.durationInSeconds : 0;
    return options;
  }

}
