import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/pages/room-booking/booking.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

export interface Room {
  roomName: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent {
  displayedColumns: string[] = ['roomName', 'type', 'status'];
  dataSource: MatTableDataSource<Room>;
  roomList: Room[] = [];
  regiForm: FormGroup;
  BookingDate: Date = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _bookingService: BookingService) {
    this.initForm();
  }
  setDataSource(data: Room[]) {
    this.roomList = data;
    this.dataSource = new MatTableDataSource(this.roomList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  formateDate(date): string {
    return date.toJSON().slice(0, 10);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  initForm() {
    this.regiForm = this.fb.group({
      'BookingDate': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this._bookingService
      .getbydate(this.formateDate(this.regiForm.value.BookingDate))
      .subscribe(data => {
        if (data != null) {
          this.setDataSource(data)
        }
      }, err => {
      })
  }

  gotoRoomList() {
    this.router.navigateByUrl('room/room-list')
  }
}


