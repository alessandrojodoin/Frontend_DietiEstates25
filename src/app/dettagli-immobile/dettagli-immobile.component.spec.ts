import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliImmobileComponent } from './dettagli-immobile.component';

describe('DettagliImmobileComponent', () => {
  let component: DettagliImmobileComponent;
  let fixture: ComponentFixture<DettagliImmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettagliImmobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettagliImmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
