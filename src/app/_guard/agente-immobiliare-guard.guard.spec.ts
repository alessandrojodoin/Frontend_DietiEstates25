import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { agenteImmobiliareGuardGuard } from '../_guard/agente-immobiliare-guard.guard';

describe('agenteImmobiliareGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => agenteImmobiliareGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
