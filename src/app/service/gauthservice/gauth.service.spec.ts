import { TestBed } from '@angular/core/testing';

import { GauthService } from './gauth.service';

describe('GauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GauthService = TestBed.get(GauthService);
    expect(service).toBeTruthy();
  });
});
