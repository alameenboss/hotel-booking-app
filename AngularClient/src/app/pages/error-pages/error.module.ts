import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ForbiddenComponent,
    NotFoundComponent
  ],
  exports: [
    ForbiddenComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'forbidden', component: ForbiddenComponent, pathMatch: 'full' },
      { path: '404', component: NotFoundComponent, pathMatch: 'full' }
    ])
  ]
})
export class ErrorModule { }
