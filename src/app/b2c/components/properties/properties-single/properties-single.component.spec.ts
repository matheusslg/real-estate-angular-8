import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesSingleComponent } from './properties-single.component';

describe('PropertiesSingleComponent', () => {
  let component: PropertiesSingleComponent;
  let fixture: ComponentFixture<PropertiesSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
