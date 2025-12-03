import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; 
import { UserService } from 'src/app/core/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedIn()) {
    return true;
  } else {
    return true;
  }
};