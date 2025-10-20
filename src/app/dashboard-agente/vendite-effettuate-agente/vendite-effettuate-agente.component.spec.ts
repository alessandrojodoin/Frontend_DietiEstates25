import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenditeEffettuateAgenteComponent } from './vendite-effettuate-agente.component';

describe('VenditeEffettuateAgenteComponent', () => {
  let component: VenditeEffettuateAgenteComponent;
  let fixture: ComponentFixture<VenditeEffettuateAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenditeEffettuateAgenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenditeEffettuateAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
