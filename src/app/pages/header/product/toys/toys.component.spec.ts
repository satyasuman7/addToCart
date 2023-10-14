import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToysComponent } from './toys.component';

describe('ToysComponent', () => {
  let component: ToysComponent;
  let fixture: ComponentFixture<ToysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
