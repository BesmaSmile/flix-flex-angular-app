import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const guestGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    // Utilisateur connecté → rediriger vers /home
    router.navigate(['/home']);
    return false;
  }

  // Utilisateur non connecté → accès autorisé
  return true;
};
