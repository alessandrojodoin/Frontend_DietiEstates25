import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferteFatteComponent } from './offerte-fatte.component';

describe('OfferteFatteComponent', () => {
  let component: OfferteFatteComponent;
  let fixture: ComponentFixture<OfferteFatteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferteFatteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferteFatteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
