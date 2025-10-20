import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaImmobilePage2Component } from './crea-immobile-page2.component';

describe('CreaImmobilePage2Component', () => {
  let component: CreaImmobilePage2Component;
  let fixture: ComponentFixture<CreaImmobilePage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaImmobilePage2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaImmobilePage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
