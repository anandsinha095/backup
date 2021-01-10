import { TestBed } from '@angular/core/testing';

import { AddCryptoService } from './add-crypto.service';

describe('AddCryptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCryptoService = TestBed.get(AddCryptoService);
    expect(service).toBeTruthy();
  });
});
