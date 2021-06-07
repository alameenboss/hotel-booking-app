import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostListComponent } from './post-list/post-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PostDialogComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: PostListComponent }
    ])
  ]
})
export class PostModule { }
