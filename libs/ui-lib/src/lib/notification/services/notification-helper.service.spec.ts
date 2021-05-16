import { TestBed } from '@angular/core/testing';

import { MyUiNotificationHelper } from './notification-helper.service';

describe('MyUiNotificationHelper', () => {
  let service: MyUiNotificationHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyUiNotificationHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
