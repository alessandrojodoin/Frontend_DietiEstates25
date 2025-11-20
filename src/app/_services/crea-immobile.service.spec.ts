import { TestBed } from '@angular/core/testing';

import { CreaImmobileService } from '../_services/crea-immobile.service';

describe('CreaImmobileService', () => {
  let service: CreaImmobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreaImmobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
