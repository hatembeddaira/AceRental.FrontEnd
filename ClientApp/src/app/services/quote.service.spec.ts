import { TestBed } from '@angular/core/testing';

import { QuoteService } from './Quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
