import { TestBed } from '@angular/core/testing';

import { LoginhistoryService } from './loginhistory.service';

describe('LoginhistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginhistoryService = TestBed.get(LoginhistoryService);
    expect(service).toBeTruthy();
  });
});
