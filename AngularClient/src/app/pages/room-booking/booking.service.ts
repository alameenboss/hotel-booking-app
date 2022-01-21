import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { roomBookingUrl } from 'src/app/shared/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) {
  }

  getbydate(date): Observable<any> {
    return this.httpClient.get(`${roomBookingUrl}/bydate/${date}`);
  }

  checkavailable(roomType,startdate,enddate): Observable<any> {
    return this.httpClient.get(`${roomBookingUrl}/checkavailable/${roomType}/${startdate}/${enddate}`);
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
    return this.httpClient.post(roomBookingUrl, data);
  }

  getMyBooking(userId): Observable<any> {
    return this.httpClient.get(`${roomBookingUrl}/mybooking/${userId}`);
  }

}
