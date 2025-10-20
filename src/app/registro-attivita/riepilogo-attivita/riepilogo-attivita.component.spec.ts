import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoAttivitaComponent } from './riepilogo-attivita.component';

describe('RiepilogoAttivitaComponent', () => {
  let component: RiepilogoAttivitaComponent;
  let fixture: ComponentFixture<RiepilogoAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiepilogoAttivitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiepilogoAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
