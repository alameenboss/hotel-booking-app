import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { BookingService } from 'src/app/pages/room-booking/booking.service';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
export interface BookRoom {
  roomId: number;
  roomName: string;
  startDate: Date;
  endDate: Date;
  type: string;
  status: string;
}
@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  currentUserId;
  displayedColumns: string[] = ['startDate', 'endDate', 'roomName', 'type'];
  dataSource: MatTableDataSource<BookRoom>;
  roomList: BookRoom[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private _bookingService: BookingService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getMyBooking();
  }

  getMyBooking() {
    this.currentUserId = this._authService.currentUserId();
    this._bookingService
      .getBookingsByUserId(this.currentUserId)
      .subscribe(data => {
        if (data != null) {
          this.setDataSource(data)
        }
      },
        error => {
          this.notifierService.showNotification('Room Not Booked', 'Ok', 'error');
        })
  }

  setDataSource(data: BookRoom[]) {
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

  searchRoom() {
    this.router.navigateByUrl('roombooking/book-room');
  }

}
