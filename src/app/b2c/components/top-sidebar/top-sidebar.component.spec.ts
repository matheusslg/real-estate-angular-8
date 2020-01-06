import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSidebarComponent } from './top-sidebar.component';

describe('TopSidebarComponent', () => {
  let component: TopSidebarComponent;
  let fixture: ComponentFixture<TopSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
