import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  //input para pasar datos a los comp hijos
  @Input()
  //asumimos que hero estara definido cuando se acceda al codigo
  public hero!:Hero;


//para aseguar que la propiedad hero este definida antes de continuar
  ngOnInit(): void {
    if(!this.hero)throw Error('Hero property is required');
  }
}
