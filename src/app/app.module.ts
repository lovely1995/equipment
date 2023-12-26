import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FrontMaintainComponent } from './front-maintain/front-maintain.component';
import { BackMaintainComponent } from './back-maintain/back-maintain.component';
import { BackAxMaintainComponent } from './back-ax-maintain/back-ax-maintain.component';
import { BackAxPickComponent } from './back-ax-pick/back-ax-pick.component';
import { BackPickComponent } from './back-pick/back-pick.component';
import { FrontPickComponent } from './front-pick/front-pick.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MaintainComponent } from './maintain/maintain.component';
import {  ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { PickComponent } from './pick/pick.component';
import { IllustrateComponent } from './illustrate/illustrate.component';
import { SetnumComponent } from './setnum/setnum.component';
import { EqumentIndexComponent } from './equment-index/equment-index.component';
import { EqumentOnemachineComponent } from './equment-onemachine/equment-onemachine.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FrontMaintainComponent,
    BackMaintainComponent,
    BackAxMaintainComponent,
    BackAxPickComponent,
    BackPickComponent,
    FrontPickComponent,
    MaintainComponent,
    PickComponent,
    IllustrateComponent,
    SetnumComponent,
    EqumentIndexComponent,
    EqumentOnemachineComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ColorPickerModule,
    HttpClientModule, BrowserAnimationsModule,

  ],
  providers: [
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
