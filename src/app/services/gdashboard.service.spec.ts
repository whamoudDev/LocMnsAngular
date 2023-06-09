import { TestBed } from '@angular/core/testing';

import { GdashboardService } from './gdashboard.service';

describe('GdashboardService', () => {
  let service: GdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
