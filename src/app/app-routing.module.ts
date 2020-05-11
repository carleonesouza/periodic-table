import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { TableDetailsComponent, GrupoDetailsComponent, BlocoDetailsComponent } from '../pages/table-details/table-details.component';
import { DetailsComponent } from '../pages/element-details/details.component';
import { NotFoundComponent } from './notfound.component';
import { HelpComponent } from '../pages/help/help.component';
import { AppComponent } from './app.component';




const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'conceitos', component: TableDetailsComponent },
      { path: 'elemento', component: DetailsComponent },
      { path: 'grupo', component: GrupoDetailsComponent },
      { path: 'ajuda', component: HelpComponent },
      { path: 'bloco', component: BlocoDetailsComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

