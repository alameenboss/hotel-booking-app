import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NotifierComponent } from './notifier/notifier.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  declarations: [NavigationComponent,NotifierComponent,LoaderComponent],
  exports: [NavigationComponent,NotifierComponent,LoaderComponent]
})
export class SharedModule { }
