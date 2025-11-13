import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultImmobiliComponent } from './search-result-immobili.component';

describe('SearchResultImmobiliComponent', () => {
  let component: SearchResultImmobiliComponent;
  let fixture: ComponentFixture<SearchResultImmobiliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultImmobiliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultImmobiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
