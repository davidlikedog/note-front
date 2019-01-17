import { TestBed, inject } from '@angular/core/testing';

import { MessageAlertService } from './message-alert.service';

describe('MessageAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageAlertService]
    });
  });

  it('should be created', inject([MessageAlertService], (service: MessageAlertService) => {
    expect(service).toBeTruthy();
  }));
});
