import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-alerts';
import { NgProgressModule } from '@ngx-progressbar/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NgProgressModule,
    //BrowserAnimationsModule,
    BrowserModule,
    //BsDropdownModule.forRoot(),
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' })
  ],
  exports: []
})
export class SharedModule { }
