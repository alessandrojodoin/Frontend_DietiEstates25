import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobiliListUtenteComponent } from './immobili-list-utente.component';

describe('ImmobiliListUtenteComponent', () => {
  let component: ImmobiliListUtenteComponent;
  let fixture: ComponentFixture<ImmobiliListUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmobiliListUtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobiliListUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
