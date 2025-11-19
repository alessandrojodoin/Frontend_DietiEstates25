import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const clienteGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  if(authService.authState.isTokenValid && authService.authState.userType === 'Cliente'){
      return true;
  }
    else{
      router.navigate(['/']);
      return false;
  }

};
