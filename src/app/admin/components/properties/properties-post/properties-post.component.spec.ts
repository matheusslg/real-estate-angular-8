import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesPostComponent } from './properties-post.component';

describe('PropertiesPostComponent', () => {
  let component: PropertiesPostComponent;
  let fixture: ComponentFixture<PropertiesPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
