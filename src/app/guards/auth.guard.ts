// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@/app/stores/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const isAuthenticated = authStore.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
