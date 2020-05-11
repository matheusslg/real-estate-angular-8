import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlugTypesPostComponent } from './slug-types-post.component';

describe('SlugTypesPostComponent', () => {
  let component: SlugTypesPostComponent;
  let fixture: ComponentFixture<SlugTypesPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlugTypesPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlugTypesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
