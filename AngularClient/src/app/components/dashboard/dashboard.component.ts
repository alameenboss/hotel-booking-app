import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/shared/services/booking.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private _bookingService: BookingService) { }
  model: NgbDateStruct;
  roomList = []
  ngOnInit() {
    const today = new Date();
    this.model = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }

  formateDate(ngbDate: NgbDateStruct):string {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day).toJSON().slice(0,10);
  }

  searchRoom() {
    this._bookingService
      .getbydate(this.formateDate(this.model))
      .subscribe(data => {
        console.log(data);
        if (data != null) {
          this.roomList = data;
        }
      }, err => {
        console.log(err)
      })
  }

  gotoRoomList() {
    this.router.navigateByUrl('room-list')
  }
}
