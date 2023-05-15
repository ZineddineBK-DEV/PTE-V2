import { TestBed } from '@angular/core/testing';

import { TechnicalTeamService } from './technical-team.service';

describe('TechnicalTeamService', () => {
  let service: TechnicalTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
