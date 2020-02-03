import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsPostComponent } from './locations-post.component';

describe('LocationsPostComponent', () => {
  let component: LocationsPostComponent;
  let fixture: ComponentFixture<LocationsPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
