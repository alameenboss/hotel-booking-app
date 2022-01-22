import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {
  roomList: BookRoom[] = [];
  regiForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _bookingService: BookingService,
    private notifierService: NotifierService,
    private _authService: AuthenticationService) {
    this.initForm();
  }

  ngOnInit() {

  }

  initForm() {
    this.regiForm = this.fb.group({
      'FromDate': [null, Validators.required],
      'ToDate': [null, Validators.required],
      'RoomType': [null, Validators.required],
    });
  }

  myBooking() {
    this.router.navigateByUrl(`roombooking/my-booking`);
  }

  formateDate(date): string {
    return date.toJSON().slice(0, 10);
  }

  searchRoom() {
    this._bookingService
      .checkavailable(this.regiForm.value.RoomType, this.formateDate(this.regiForm.value.FromDate), this.formateDate(this.regiForm.value.ToDate))
      .subscribe(data => {
        if (data != null) {
          this.roomList = data;
        }
      }, err => {
        this.notifierService.showNotification('Error Occured!', 'Ok', "error");
      })
  }

  bookRoom(roomId) {
    const data = {
      startDate: this.formateDate(this.regiForm.value.FromDate),
      endDate: this.formateDate(this.regiForm.value.ToDate),
      roomId: roomId,
      userId: this._authService.currentUserId()
    };

    this._bookingService.bookRoom(data)
      .subscribe(
        response => {
          this.notifierService.showNotification('Room Booked Successfully', 'Ok', 'success');
          this.searchRoom();
        },
        error => {
          this.notifierService.showNotification('Room Not Booked', 'Ok', 'error');
        });
  }

}
