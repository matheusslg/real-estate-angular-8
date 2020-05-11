import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlugTypesListComponent } from './slug-types-list.component';

describe('SlugTypesListComponent', () => {
  let component: SlugTypesListComponent;
  let fixture: ComponentFixture<SlugTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlugTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlugTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
