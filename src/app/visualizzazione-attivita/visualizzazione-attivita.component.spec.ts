import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzazioneAttivitaComponent } from './visualizzazione-attivita.component';

describe('VisualizzazioneAttivitaComponent', () => {
  let component: VisualizzazioneAttivitaComponent;
  let fixture: ComponentFixture<VisualizzazioneAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizzazioneAttivitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzazioneAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
