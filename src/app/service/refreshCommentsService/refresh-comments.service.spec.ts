import { TestBed } from '@angular/core/testing';

import { RefreshCommentsService } from './refresh-comments.service';

describe('RefreshCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshCommentsService = TestBed.get(RefreshCommentsService);
    expect(service).toBeTruthy();
  });
});
