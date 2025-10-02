import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferteRicevuteComponent } from './offerte-ricevute.component';

describe('OfferteRicevuteComponent', () => {
  let component: OfferteRicevuteComponent;
  let fixture: ComponentFixture<OfferteRicevuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferteRicevuteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferteRicevuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
