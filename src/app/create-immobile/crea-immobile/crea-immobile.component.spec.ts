import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaImmobileComponent } from './crea-immobile.component';

describe('CreaImmobileComponent', () => {
  let component: CreaImmobileComponent;
  let fixture: ComponentFixture<CreaImmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaImmobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaImmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
