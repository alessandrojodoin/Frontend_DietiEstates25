import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobiliListAgenteComponent } from './immobili-list-agente.component';

describe('ImmobiliListAgenteComponent', () => {
  let component: ImmobiliListAgenteComponent;
  let fixture: ComponentFixture<ImmobiliListAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmobiliListAgenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobiliListAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
