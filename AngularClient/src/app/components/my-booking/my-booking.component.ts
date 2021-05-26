import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  roomList = [];
  currentUserId;
  constructor(
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router,
    private _bookingService: BookingService,
    private _authService: AuthenticationService) { }

  ngOnInit() {
    this.getMyBooking();
  }

  getMyBooking(){
    this.currentUserId = this._authService.currentUserId();
    this._bookingService
    .getMyBooking(this.currentUserId)
    .subscribe(data=>{
      console.log(data);
      this.progressBar.setSuccess();
        if (data != null) {
          this.roomList = data;
          this.alertService.success(`${this.roomList.length}('s) Rooms Found!`);
        }
        this.progressBar.completeLoading();
    },
      error => {
        console.log(error);
        this.progressBar.setError();
        this.alertService.danger('Room Not Booked');
        this.progressBar.completeLoading();
      })
  }

}
