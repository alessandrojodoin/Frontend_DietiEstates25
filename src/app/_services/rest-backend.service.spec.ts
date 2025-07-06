import { TestBed } from '@angular/core/testing';

import { AuthRestService } from './rest-backend.service';

describe('RestBackendService', () => {
  let service: AuthRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
