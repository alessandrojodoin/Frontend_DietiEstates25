import { TestBed } from '@angular/core/testing';

import { OfferteServiceService } from './offerte-service.service';

describe('OfferteServiceService', () => {
  let service: OfferteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
