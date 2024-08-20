import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { CanActiveGuard, CanMatchGuard } from './auth/guards/auth.guard';
import { CanActivePublicGuard, CanMatchPublicGuard } from './auth/guards/public.guard';

const routes: Routes = [

  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[CanActivePublicGuard], // Anclamos la funcion canActive
    canMatch:[CanMatchPublicGuard],
  },

  {
    path:'heroes',
    loadChildren:() => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate:[CanActiveGuard], // Anclamos la funcion canActive
    canMatch:[CanMatchGuard],
  },

  {
    path:'404',
    component:Error404PageComponent,
  },

   //Para redireccionar cuando ingresen a la pagina .com
  {
    path:'',
    redirectTo:'heroes',
    //para que el path sea exactamente igual al path que definimos
    pathMatch:'full'
  },

  {
    //cualquier otro path que no coincida con lo definido, redirecciona al 404
    path:'**',
    redirectTo:'404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
