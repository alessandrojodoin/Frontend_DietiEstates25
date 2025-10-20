import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaImmobilePage1Component } from './crea-immobile-page1.component';

describe('CreaImmobilePage1Component', () => {
  let component: CreaImmobilePage1Component;
  let fixture: ComponentFixture<CreaImmobilePage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaImmobilePage1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaImmobilePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
