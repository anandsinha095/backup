import { TestBed } from '@angular/core/testing';

import { ErrorserviceService } from './errorservice.service';

describe('ErrorserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorserviceService = TestBed.get(ErrorserviceService);
    expect(service).toBeTruthy();
  });
});
