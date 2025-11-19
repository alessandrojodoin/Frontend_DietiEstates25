import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  

 if(authService.authState.isTokenValid && authService.authState.userType === 'AmministratoreAgenzia'){
      return true;
  }
    else{
      router.navigate(['/']);
      return false;
  }

};


 


