import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  //? porque cuando cargamos por primera vez no existe el user
  private user?:User;


  constructor(private http: HttpClient) { }

get currentUser():User|undefined{
 if(!this.user) return undefined;
 //para realizar un clone del user
  return structuredClone(this.user);

 //  return {...this.user};
}


login(email:string, password:string):Observable<User>{

  return this.http.get<User>(`${this.baseUrl}/users/1`)
  //encadenar metodos rxjs
  .pipe(
    tap(user =>{
      this.user = user;
    }),
    //localStorage guarda user.id en el token
    tap(user => localStorage.setItem('token', 'asdhlasdlk.asdas.asd'))
    );
}

//para volver a cargar toda la info
checkAuthentication():Observable<boolean>{
  if(typeof window !== 'undefined'){

    if(!localStorage.getItem('token')){
      return of (false)
    }
    const token = localStorage.getItem('token');
  }
  return this.http.get<User>(`${this.baseUrl}/users/1`)
  .pipe(
    tap(user => this.user = user),
    //para regresar un valor booleano
    map(user => !!user),
    catchError(err => of (false))
  );
}


logout(){
  this.user = undefined;
  localStorage.clear();
}

}
