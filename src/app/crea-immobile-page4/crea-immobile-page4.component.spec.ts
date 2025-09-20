import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaImmobilePage4Component } from './crea-immobile-page4.component';

describe('CreaImmobilePage4Component', () => {
  let component: CreaImmobilePage4Component;
  let fixture: ComponentFixture<CreaImmobilePage4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaImmobilePage4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaImmobilePage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
