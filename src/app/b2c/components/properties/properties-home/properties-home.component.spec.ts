import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesHomeComponent } from './properties-home.component';

describe('PropertiesHomeComponent', () => {
  let component: PropertiesHomeComponent;
  let fixture: ComponentFixture<PropertiesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
