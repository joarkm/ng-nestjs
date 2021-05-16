import { TestBed } from '@angular/core/testing';

import { MyUiNotificationService } from './notification.service';

describe('MyUiNotificationService', () => {
  let service: MyUiNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyUiNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
