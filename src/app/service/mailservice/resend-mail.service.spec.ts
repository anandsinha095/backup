import { TestBed } from '@angular/core/testing';

import { ResendMailService } from './resend-mail.service';

describe('ResendMailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResendMailService = TestBed.get(ResendMailService);
    expect(service).toBeTruthy();
  });
});
