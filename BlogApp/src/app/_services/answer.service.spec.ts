import { TestBed } from '@angular/core/testing';

import { AnswerService } from './answer.service';

describe('AuthService', () => {
  let service: AnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
