import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionComponent } from './fashion.component';

describe('FashionComponent', () => {
  let component: FashionComponent;
  let fixture: ComponentFixture<FashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
