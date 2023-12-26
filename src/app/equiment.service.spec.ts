import { TestBed } from '@angular/core/testing';

import { EquimentService } from './equiment.service';

describe('EquimentService', () => {
  let service: EquimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
