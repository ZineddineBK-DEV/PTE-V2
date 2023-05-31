import { TestBed } from '@angular/core/testing';

import { VirtualisationService } from './virtualisation.service';

describe('VirtualisationService', () => {
  let service: VirtualisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
