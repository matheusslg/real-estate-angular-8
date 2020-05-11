import { TestBed } from '@angular/core/testing';

import { SlugTypeService } from './slugType.service';

describe('SlugTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlugTypeService = TestBed.get(SlugTypeService);
    expect(service).toBeTruthy();
  });
});
