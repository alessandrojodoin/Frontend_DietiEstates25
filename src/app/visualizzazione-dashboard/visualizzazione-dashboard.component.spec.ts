import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzazioneDashboardComponent } from './visualizzazione-dashboard.component';

describe('VisualizzazioneDashboardComponent', () => {
  let component: VisualizzazioneDashboardComponent;
  let fixture: ComponentFixture<VisualizzazioneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizzazioneDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzazioneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
