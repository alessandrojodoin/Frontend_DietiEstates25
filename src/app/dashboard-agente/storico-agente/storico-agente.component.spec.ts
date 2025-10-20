import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoAgenteComponent } from './storico-agente.component';

describe('StoricoAgenteComponent', () => {
  let component: StoricoAgenteComponent;
  let fixture: ComponentFixture<StoricoAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoricoAgenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoricoAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
