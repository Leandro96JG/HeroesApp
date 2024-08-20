
import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated ) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    })
  );
};



export const CanActiveGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {


  return checkAuthStatus();
}


export const CanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  return checkAuthStatus();
}









