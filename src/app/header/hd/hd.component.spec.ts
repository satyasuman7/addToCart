import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdComponent } from './hd.component';

describe('HdComponent', () => {
  let component: HdComponent;
  let fixture: ComponentFixture<HdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
