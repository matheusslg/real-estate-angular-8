import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlugTypesComponent } from './slug-types.component';

describe('SlugTypesComponent', () => {
  let component: SlugTypesComponent;
  let fixture: ComponentFixture<SlugTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlugTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlugTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
