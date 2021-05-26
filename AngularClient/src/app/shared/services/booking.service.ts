import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl;
  constructor(private httpClient: HttpClient,
    private envUrl: EnvironmentUrlService) {
    this.baseUrl = this.envUrl.urlAddress + '/api/bookings';
  }

  getbydate(date): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bydate/${date}`);
  }

  checkavailable(roomType,startdate,enddate): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/checkavailable/${roomType}/${startdate}/${enddate}`);
  }

  bookRoom(data): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }

  getMyBooking(userId): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/mybooking/${userId}`);
  }

}
