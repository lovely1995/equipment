import { TestBed } from '@angular/core/testing';

import { PickitemService } from './pickitem.service';

describe('PickitemService', () => {
  let service: PickitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
