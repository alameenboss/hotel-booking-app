import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { RoomService } from 'src/app/pages/room/room.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  editRoom(roomnumber) {
    this.router.navigateByUrl('room/edit-room/' + roomnumber)
  }

  addRoom() {
    this.router.navigateByUrl(`room/add-room`);
  }
}



