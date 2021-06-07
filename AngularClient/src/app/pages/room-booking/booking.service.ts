import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.urlAddress + '/api/bookings';
  }

  getbydate(date): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bydate/${date}`);
  }

  checkavailable(roomType,startdate,enddate): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/checkavailable/${roomType}/${startdate}/${enddate}`);
  }

  checkavailablefake(roomType,startdate,enddate): Observable<any> {
    const roomList = [
      {roomType:'Single',RoomNumber:'S-100',price:1299},
      {roomType:'Single',RoomNumber:'S-101',price:1599},
      {roomType:'Double',RoomNumber:'S-102',price:1799},
      {roomType:'Single',RoomNumber:'S-103',price:1499},
      {roomType:'Double',RoomNumber:'S-104',price:1399},
      {roomType:'Double',RoomNumber:'S-105',price:1899},
    ]
    return of(roomList);
  }

  bookRoom(data): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }

  getMyBooking(userId): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/mybooking/${userId}`);
  }

}
