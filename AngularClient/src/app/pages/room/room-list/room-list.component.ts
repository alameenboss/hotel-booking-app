import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { RoomService } from 'src/app/pages/room/room.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditRoomComponent } from '../add-edit-room/add-edit-room.component';

export interface Room {
  id: number;
  email: string;
  type: string;
}

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'action'];
  dataSource: MatTableDataSource<Room>;
  roomList: Room[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private dialog: MatDialog,
    private roomService: RoomService) {
  }

  ngOnInit() {
    this.getRoomList()
  }

  setDataSource(data: Room[]) {
    this.roomList = data;
    this.dataSource = new MatTableDataSource(this.roomList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRoomList() {
    this.roomService.getAll().subscribe(res => {
      if (res != null)
        this.setDataSource(res)
    }, () => this.notifierService.showNotification('Error Occured!', 'Ok', "error"))
  }

  editRoom(roomId: number) {
    this.openDialog(roomId);
  }

  addRoom() {
    this.openDialog(0);
  }

  openDialog(roomId: number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: roomId
    };
    const dialogRef = this.dialog.open(AddEditRoomComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.getRoomList();
      }
    );
  }

  deleteRoom(roomId: number): void {

    this.roomService.delete(roomId)
      .subscribe(
        response => {
          this.getRoomList();
          this.notifierService.showNotification('Room deleted!', 'Ok', "success");
        },
        error => {
          this.notifierService.showNotification('Error Occured!', 'Ok', "error");
        });
  }
}



