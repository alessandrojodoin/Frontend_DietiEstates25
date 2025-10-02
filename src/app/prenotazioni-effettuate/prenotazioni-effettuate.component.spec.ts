import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniEffettuateComponent } from './prenotazioni-effettuate.component';

describe('PrenotazioniEffettuateComponent', () => {
  let component: PrenotazioniEffettuateComponent;
  let fixture: ComponentFixture<PrenotazioniEffettuateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioniEffettuateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenotazioniEffettuateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
