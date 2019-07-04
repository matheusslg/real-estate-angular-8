import { TestBed } from '@angular/core/testing';

import { UsefullService } from './usefull.service';

describe('UsefullService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsefullService = TestBed.get(UsefullService);
    expect(service).toBeTruthy();
  });
});
