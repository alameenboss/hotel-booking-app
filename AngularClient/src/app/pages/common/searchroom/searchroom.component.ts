import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { BookingService } from '../../room-booking/booking.service';

@Component({
  selector: 'app-search-room',
  templateUrl: './searchroom.component.html',
  styleUrls: ['./searchroom.component.scss']
})
export class SearchRoomComponent {
  from:string;
  to:string;
  type:string;
  roomList = [];

  constructor(
    private route: ActivatedRoute,
    private _bookingService: BookingService, 
    private notifierService: NotifierService) {
    this.initForm();

  }
  initForm() {
    this.from = this.route.snapshot.paramMap.get('from');
    this.to = this.route.snapshot.paramMap.get('to');
    this.type = this.route.snapshot.paramMap.get('type');

    this._bookingService
      .checkavailablefake(this.type, this.from, this.to)
      .subscribe(data => {
        if (data != null) {
          this.roomList = data;
        }
      }, err => {
        this.notifierService.showNotification('Error Occured!', 'Ok', "error");
      })
  }

}