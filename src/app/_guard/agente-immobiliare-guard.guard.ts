import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const agenteImmobiliareGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


 if(authService.authState.isTokenValid && authService.authState.userType === 'AgenteImmobiliare'){
      return true;
  }
    else{
      router.navigate(['/']);
      return false;
  }

};