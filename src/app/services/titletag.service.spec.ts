import { TestBed } from '@angular/core/testing';

import { TitleTagService } from './titletag.service';

describe('TitleTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleTagService = TestBed.get(TitleTagService);
    expect(service).toBeTruthy();
  });
});
