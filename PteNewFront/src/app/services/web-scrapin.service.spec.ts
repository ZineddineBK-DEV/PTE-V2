import { TestBed } from '@angular/core/testing';

import { WebScrapinService } from './web-scrapin.service';

describe('WebScrapinService', () => {
  let service: WebScrapinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebScrapinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
