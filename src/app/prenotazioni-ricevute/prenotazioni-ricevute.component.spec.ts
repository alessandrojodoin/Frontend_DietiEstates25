import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniRicevuteComponent } from './prenotazioni-ricevute.component';

describe('PrenotazioniRicevuteComponent', () => {
  let component: PrenotazioniRicevuteComponent;
  let fixture: ComponentFixture<PrenotazioniRicevuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioniRicevuteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenotazioniRicevuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
