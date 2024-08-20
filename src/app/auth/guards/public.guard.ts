
import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable,map,tap } from 'rxjs';


//para que no pueda entrar al auth desde la pag principal una vez iniciado seccion

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const publicGuard: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return publicGuard.checkAuthentication().pipe(

    tap(
      isAuth => {
        if(isAuth){
          router.navigateByUrl('./')
        }
      }
    ),
    //para que no pueda entrar al list se transforma el boolean
    map(
      isAuth => !isAuth

    )
  )
};



export const CanActivePublicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {


  return checkAuthStatus();
}


export const CanMatchPublicGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {


  return checkAuthStatus();
}
