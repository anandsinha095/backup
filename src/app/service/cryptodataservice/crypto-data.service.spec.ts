import { TestBed } from '@angular/core/testing';

import { CryptoDataService } from './crypto-data.service';

describe('CryptoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoDataService = TestBed.get(CryptoDataService);
    expect(service).toBeTruthy();
  });
});
