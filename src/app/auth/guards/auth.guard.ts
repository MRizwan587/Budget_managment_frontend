import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
// Import your AuthService
import { AuthService } from '../../auth/services/auth.service'; 

export const authGuard: CanActivateFn = (route, state) => {

  // 1. Inject the necessary services
  const authService = inject(AuthService);
  const router = inject(Router);

  // 2. Check the login status
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // return router.createUrlTree(['/login']); 
    return true;
  }
};