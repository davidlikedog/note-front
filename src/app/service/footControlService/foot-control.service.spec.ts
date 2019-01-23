import { TestBed, inject } from '@angular/core/testing';

import { FootControlService } from './foot-control.service';

describe('FootControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootControlService]
    });
  });

  it('should be created', inject([FootControlService], (service: FootControlService) => {
    expect(service).toBeTruthy();
  }));
});
