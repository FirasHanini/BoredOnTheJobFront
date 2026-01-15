import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePayementComponent } from './stripe-payement.component';

describe('StripePayementComponent', () => {
  let component: StripePayementComponent;
  let fixture: ComponentFixture<StripePayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePayementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
