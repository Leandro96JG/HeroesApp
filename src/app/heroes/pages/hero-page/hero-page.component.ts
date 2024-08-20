import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';


@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit {

  public hero?:Hero;

  constructor(
    private heroesService:HeroesService,
    //para activar el url y leer (?
    private activateRoute:ActivatedRoute,
    private router:Router,
    ){}


  ngOnInit(): void {
    //params tiene que tener parametros dinamicos definidos 'path:/:id'
    //params es un observable que emite los parámetros de la ruta cuando esta cambia.
    this.activateRoute.params
    //.pipe crear cadenas de operaciones asíncronas. Estas cadenas de operaciones permiten transformar y manipular los datos emitidos por un observable antes de que lleguen al consumidor final.
    .pipe(
        delay(1000),
        switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe(hero =>{
      //si no encuentra id retorna al listpage
      if(!hero) return this.router.navigate(['/heroes/list']);
      this.hero = hero;
      return;
      })
  }

  goBack():void{
    //para regresar a heroe/list
    this.router.navigateByUrl('heroes/list');
  }

}
