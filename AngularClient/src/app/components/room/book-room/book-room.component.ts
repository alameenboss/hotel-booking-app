import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  roomType:string='';
  roomList = []

  constructor(
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router,
    private calendar: NgbCalendar, 
    private _bookingService: BookingService,
    private _authService: AuthenticationService,
    public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  ngOnInit() {
    
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  
  myBooking(){
    this.router.navigateByUrl(`my-booking`);
  }

  formateDate(ngbDate: NgbDateStruct):string {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day).toJSON().slice(0,10);
  }

  searchRoom() {
    this.progressBar.startLoading();
    this._bookingService
      .checkavailable(this.roomType,this.formateDate(this.fromDate),this.formateDate(this.toDate))
      .subscribe(data=> {
        console.log(data);
        this.progressBar.setSuccess();
        if (data != null) {
          this.roomList = data;
          this.alertService.success(`${this.roomList.length}('s) Rooms Found!`);
        }
        this.progressBar.completeLoading();
      }, err => {
        console.log(err)
        this.progressBar.setError();
        this.alertService.danger('Error Occured!');
        this.progressBar.completeLoading();
      })
  }

  bookRoom(roomId){
    const data = {
      startDate: this.formateDate(this.fromDate),
      endDate: this.formateDate(this.toDate),
      roomId: roomId,
      userId: this._authService.currentUserId()
    };
    this.progressBar.startLoading();
    this._bookingService.bookRoom(data)
      .subscribe(
        response => {
          console.log(response);
          this.progressBar.setSuccess();
          this.alertService.success('Room Booked Successfully');
          this.progressBar.completeLoading();
          this.searchRoom();
        },
        error => {
          console.log(error);
          this.progressBar.setError();
          this.alertService.danger('Room Not Booked');
          this.progressBar.completeLoading();
        });
  }

}
