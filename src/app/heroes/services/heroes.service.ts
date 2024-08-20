import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {



  //para usar el url del env.
  private baseUrl:string = environments.baseUrl;
  // para realizar una solicitud para obtener los datos de héroes desde algún servidor
  constructor(private http: HttpClient) { }




//obtener heroes y enviar
getHeroes():Observable<Hero[]>{
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
}

//undefined porque puede buscar un id que no exista
getHeroById(id:string):Observable<Hero | undefined>{
  return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
  .pipe(
    catchError(error => of(undefined) )
  );
  //el catchError regresa un observable de tipo undefined
}

getSuggestions( query:string):Observable<Hero[]>{
return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=5`)
}

addHero( hero: Hero ):Observable<Hero>{
 //post porque necesito crear un nuevo heroe
return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
}

updateHero( hero: Hero ):Observable<Hero>{
 //post porque necesito actualizar un heroe
 if(!hero.id) throw Error('Hero id is requerid');
//  mandamos el hero como objeto que queremos actualizar
return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
}

deleteHeroById( id: string ):Observable<boolean>{

return this.http.delete(`${this.baseUrl}/heroes/${id}`,)
.pipe(
  map( resp => true ),
  catchError(err => of (false)),
);
}

}
