import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { UserListComponent } from './user-list/user-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    UserListComponent
  ],
  exports: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent, pathMatch: 'full' }
    ])
  ]
})
export class UserModule { }
