import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesPostComponent } from './cities-post.component';

describe('CitiesPostComponent', () => {
  let component: CitiesPostComponent;
  let fixture: ComponentFixture<CitiesPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
