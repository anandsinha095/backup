import { TestBed } from '@angular/core/testing';

import { IndividualKycService } from './individual-kyc.service';

describe('IndividualKycService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndividualKycService = TestBed.get(IndividualKycService);
    expect(service).toBeTruthy();
  });
});
