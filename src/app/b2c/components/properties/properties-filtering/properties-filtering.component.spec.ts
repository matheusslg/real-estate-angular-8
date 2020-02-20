import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesFilteringComponent } from './properties-filtering.component';

describe('PropertiesFilteringComponent', () => {
  let component: PropertiesFilteringComponent;
  let fixture: ComponentFixture<PropertiesFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
