import { TestBed } from '@angular/core/testing';

import { CommoncallService } from './commoncall.service';

describe('CommoncallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommoncallService = TestBed.get(CommoncallService);
    expect(service).toBeTruthy();
  });
});
