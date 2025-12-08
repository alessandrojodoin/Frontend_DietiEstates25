import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagButtonComponent } from './add-tag-button.component';

describe('AddTagButtonComponent', () => {
  let component: AddTagButtonComponent;
  let fixture: ComponentFixture<AddTagButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTagButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTagButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
