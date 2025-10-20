import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaImmobilePage3Component } from './crea-immobile-page3.component';

describe('CreaImmobilePage3Component', () => {
  let component: CreaImmobilePage3Component;
  let fixture: ComponentFixture<CreaImmobilePage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaImmobilePage3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaImmobilePage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
