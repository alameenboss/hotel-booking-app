import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { AddEditRoomComponent } from './add-edit-room/add-edit-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomListComponent } from './room-list/room-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DashboardComponent,
    RoomListComponent,
    AddEditRoomComponent
  ],
  exports: [
    DashboardComponent,
    RoomListComponent,
    AddEditRoomComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard Page' } },
      { path: 'room-list', component: RoomListComponent, data: { title: 'Room List' } },
      { path: 'add-room', component: AddEditRoomComponent, data: { title: 'Add Room' } },
      { path: 'edit-room/:id', component: AddEditRoomComponent, data: { title: 'Edit Room' } }
    ])
  ]
})
export class RoomModule { }
