import { TestBed } from '@angular/core/testing';

import { ForgotserviceService } from './forgotservice.service';

describe('ForgotserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgotserviceService = TestBed.get(ForgotserviceService);
    expect(service).toBeTruthy();
  });
});
