import { TestBed } from '@angular/core/testing';

import { SecondPasswordService } from './second-password.service';

describe('SecondPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecondPasswordService = TestBed.get(SecondPasswordService);
    expect(service).toBeTruthy();
  });
});
