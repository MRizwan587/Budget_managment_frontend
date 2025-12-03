import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role')?.replace(/"/g, '').toLowerCase(); 

  if (role?.toLowerCase() === 'admin') {
    return true;
  } else {
    return false;
  }
};