import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaAgenteComponent } from './crea-agente.component';

describe('CreaAgenteComponent', () => {
  let component: CreaAgenteComponent;
  let fixture: ComponentFixture<CreaAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaAgenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
