import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPostComponent } from './types-post.component';

describe('TypesPostComponent', () => {
  let component: TypesPostComponent;
  let fixture: ComponentFixture<TypesPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
