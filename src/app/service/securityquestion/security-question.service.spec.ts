import { TestBed } from '@angular/core/testing';

import { SecurityQuestionService } from './security-question.service';

describe('SecurityQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityQuestionService = TestBed.get(SecurityQuestionService);
    expect(service).toBeTruthy();
  });
});
