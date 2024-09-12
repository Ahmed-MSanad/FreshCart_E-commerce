import { TestBed } from '@angular/core/testing';

import { BlankService } from './blank.service';

describe('BlankService', () => {
  let service: BlankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
