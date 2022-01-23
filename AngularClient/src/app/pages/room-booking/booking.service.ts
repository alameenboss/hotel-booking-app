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

  getByDate(startDate): Observable<any> {
    return this.httpClient.get(`${roomBookingUrl}/${startDate}`);
  }

  getAvailableRooms(roomType,startdate,enddate): Observable<any> {
    return this.httpClient.get(`${roomBookingUrl}/${roomType}/${startdate}/${enddate}`);
  }

  bookRoom(data): Observable<any> {
    return this.httpClient.post(roomBookingUrl, data);
  }

  getBookingsByUserId(userId): Observable<any> {
    return this.httpClient.get(`${roomBookingUrl}/user/${userId}`);
  }

}
