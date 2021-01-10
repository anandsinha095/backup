import { TestBed } from '@angular/core/testing';

import { TwoFaService } from './two-fa.service';

describe('TwoFaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwoFaService = TestBed.get(TwoFaService);
    expect(service).toBeTruthy();
  });
});
