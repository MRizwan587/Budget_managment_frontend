import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role')?.replace(/"/g, '').toLowerCase(); // get string directly

  if (role?.toLowerCase() === 'admin') {
    return true; // allow access
  } else {
    // Optionally, redirect to login or unauthorized page
    console.warn('Access denied - Admins only');
    return false;
  }
};