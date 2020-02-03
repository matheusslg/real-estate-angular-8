import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPostComponent } from './categories-post.component';

describe('CategoriesPostComponent', () => {
  let component: CategoriesPostComponent;
  let fixture: ComponentFixture<CategoriesPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
