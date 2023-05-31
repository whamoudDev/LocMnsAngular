import { TestBed } from '@angular/core/testing';

import { TypelocationService } from './typelocation.service';

describe('TypelocationService', () => {
  let service: TypelocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypelocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
