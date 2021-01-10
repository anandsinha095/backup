import { TestBed } from '@angular/core/testing';

import { CountrydataService } from './countrydata.service';

describe('CountrydataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountrydataService = TestBed.get(CountrydataService);
    expect(service).toBeTruthy();
  });
});
