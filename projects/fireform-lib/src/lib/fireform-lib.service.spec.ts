import { TestBed } from '@angular/core/testing';

import { FireFormLibService } from './fireform-lib.service';

describe('FireFormLibService', () => {
  let service: FireFormLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireFormLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
