import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagInsertFieldComponent } from './tag-insert-field.component';

describe('TagInsertFieldComponent', () => {
  let component: TagInsertFieldComponent;
  let fixture: ComponentFixture<TagInsertFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagInsertFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagInsertFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
