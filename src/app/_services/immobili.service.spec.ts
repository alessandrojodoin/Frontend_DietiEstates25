import { TestBed } from '@angular/core/testing';

import { ImmobiliService } from './offerte-service.service';

describe('ImmobiliService', () => {
  let service: ImmobiliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmobiliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
