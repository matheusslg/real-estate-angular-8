import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesSlideshowComponent } from './properties-slideshow.component';

describe('PropertiesSlideshowComponent', () => {
  let component: PropertiesSlideshowComponent;
  let fixture: ComponentFixture<PropertiesSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesSlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
