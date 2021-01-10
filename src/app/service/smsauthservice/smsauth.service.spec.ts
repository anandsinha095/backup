import { TestBed } from '@angular/core/testing';

import { SmsauthService } from './smsauth.service';

describe('SmsauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmsauthService = TestBed.get(SmsauthService);
    expect(service).toBeTruthy();
  });
});
