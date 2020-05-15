import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteMaterialModule } from './../site-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import * as Hammer from 'hammerjs';
import {
  RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '../pages/home/home.component';
import { DetailsComponent, DialogComponent } from './../pages/element-details/details.component';
import { TableDetailsComponent, GrupoDetailsComponent, BlocoDetailsComponent } from './../pages/table-details/table-details.component';
import { NotFoundComponent } from './notfound.component';
import { Table } from './../models/table';
import { HelpComponent } from '../pages/help/help.component';
import { FooterComponent } from '../pages/footer/footer.component';

import { environment } from '../environments/environment';
export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableDetailsComponent,
    DetailsComponent,
    NotFoundComponent,
    HelpComponent,
    DialogComponent,
    FooterComponent,
    GrupoDetailsComponent,
    BlocoDetailsComponent

  ],
  imports: [
    AngularFireModule.initializeApp(environment),
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SiteMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,

  ],
  exports: [
    RouterModule
  ]
  ,
  entryComponents: [AppComponent, DialogComponent],

  providers: [Table,
    {provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
