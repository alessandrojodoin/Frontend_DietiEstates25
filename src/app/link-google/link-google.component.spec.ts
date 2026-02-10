import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkGoogleComponent } from './link-google.component';

describe('LinkGoogleComponent', () => {
  let component: LinkGoogleComponent;
  let fixture: ComponentFixture<LinkGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkGoogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
