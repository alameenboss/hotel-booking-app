import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';
import { BookingService } from '../../room-booking/booking.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  regiForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private _bookingService: BookingService, 
    private router: Router,
    private notifierService: NotifierService,
    ) {
    this.initForm();

  }
  initForm() {
    this.regiForm = this.fb.group({
      'FromDate': [null, Validators.required],
      'ToDate': [null, Validators.required],
      'RoomType': [null, Validators.required],
    });
  }

  formateDate(date): string {
    return date.toJSON().slice(0, 10);
  }

  searchRoom() {
    const url = `default/searchroom/${this.formateDate(this.regiForm.value.FromDate)}/${this.formateDate(this.regiForm.value.ToDate)}/${this.regiForm.value.RoomType}`
    this.router.navigateByUrl(url)
  }
}