import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// Bloque l'accès aux routes protégées si l'utilisateur n'est pas authentifié.
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated) {
    return state.url.startsWith('/admin') && !auth.hasAdminRole
      ? router.createUrlTree(['/'])
      : true;
  }
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
