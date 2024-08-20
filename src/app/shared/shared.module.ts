import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    LoadingSpinnerComponent
  ],
  imports: [

  ],
  exports:[
    Error404PageComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
