import { TestBed } from '@angular/core/testing';

import { FireformLibService } from './fireform-lib.service';

describe('FireformLibService', () => {
  let service: FireformLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireformLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
