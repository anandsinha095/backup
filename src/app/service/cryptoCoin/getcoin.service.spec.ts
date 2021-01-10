import { TestBed } from '@angular/core/testing';

import { GetcoinService } from './getcoin.service';

describe('GetcoinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetcoinService = TestBed.get(GetcoinService);
    expect(service).toBeTruthy();
  });
});
