import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmministratoreSupportoComponent } from './amministratore-supporto.component';

describe('AmministratoreSupportoComponent', () => {
  let component: AmministratoreSupportoComponent;
  let fixture: ComponentFixture<AmministratoreSupportoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmministratoreSupportoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmministratoreSupportoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
