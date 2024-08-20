import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {

public publishers = [
  {
    id:'DC Comics', desc: 'DC - Comics'
  },
  {
    id:'Marvel Comics', desc:'Marvel - Comics',
  },
];


//para que sea un formulario reactivo

public heroForm = new FormGroup({
  id:         new FormControl<string>(''),
  //para que no sea nulo ni undefined
  superhero:  new FormControl<string>('',{nonNullable: true}),
  publisher:  new FormControl<Publisher>(Publisher.DCComics),
  alter_ego:  new FormControl(''),
  first_appearance: new FormControl(''),
  characters: new FormControl(''),
  alt_img:    new FormControl(''),
});

constructor(private heroesService:HeroesService,
            private activatedRoute:ActivatedRoute,
            private router:Router,
            //para mostrar un msje tipo modal
            private snackbar: MatSnackBar,
            //dialog por seguridad antes de borrar
            private dialog:MatDialog ){}

get currentHero():Hero{
  //trate a this.heroForm.value como un heroe para poder retornarlo en el update
  const hero = this.heroForm.value as Hero;
  return hero;
}


ngOnInit(): void {

   if(!this.router.url.includes('edit'))return;

   this.activatedRoute.params
   .pipe(
    switchMap(({id}) => this.heroesService.getHeroById(id))
   ).subscribe(hero =>{
    if(!hero) return this.router.navigateByUrl('/');
    this.heroForm.reset(hero);
    return;
   })


}

onSubmit():void{

  if(this.heroForm.invalid)return;

  if(this.currentHero.id){
    this.heroesService.updateHero(this.currentHero)
    .subscribe(hero => {
      //TODO: mostrar snackbar
      this.showSnackBar(` ${hero.superhero} updated!`)

    });
    return;
  }
 this.heroesService.addHero(this.currentHero)
 .subscribe(hero => {
  this.router.navigate(['/heroes/edit',hero.id])
   //TODO: mostrar snackbar, y navegar a /heroes/edit/hero.id
  this.showSnackBar(` ${hero.superhero} created!`)
 })
}

onDeleteHero(){
  if(!this.currentHero.id) throw Error('Hero id is requerid');

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: this.heroForm.value,
  });

  dialogRef.afterClosed().pipe(
    filter((result:boolean) => result),
    switchMap(()=>this.heroesService.deleteHeroById(this.currentHero.id)),
    filter(wasDeleted =>wasDeleted),

    )
    .subscribe(() => {
      this.router.navigateByUrl('heroes/list');
    })

  // dialogRef.afterClosed().subscribe(result => {
  //   if(!result)return;
  //   this.heroesService.deleteHeroById(this.currentHero.id)
  //   .subscribe(wasDeleted => {
  //     if(wasDeleted)
  //     this.router.navigateByUrl('heroes/list');
  //   });
  // })
}


showSnackBar(message:string):void{
  this.snackbar.open(message,'done',{
    duration:3500,
  })
}

}
