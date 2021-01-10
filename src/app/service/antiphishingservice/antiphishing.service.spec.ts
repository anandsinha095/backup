import { TestBed } from '@angular/core/testing';

import { AntiphishingService } from './antiphishing.service';

describe('AntiphishingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AntiphishingService = TestBed.get(AntiphishingService);
    expect(service).toBeTruthy();
  });
});
