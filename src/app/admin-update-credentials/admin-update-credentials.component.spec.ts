import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateCredentialsComponent } from './admin-update-credentials.component';

describe('AdminUpdateCredentialsComponent', () => {
  let component: AdminUpdateCredentialsComponent;
  let fixture: ComponentFixture<AdminUpdateCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateCredentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
