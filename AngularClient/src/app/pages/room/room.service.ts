import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roomUrl } from 'src/app/shared/apiEndPoints';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<any> {
    return this.httpClient.get(roomUrl);
  }

  getById(id): Observable<any> {
    return this.httpClient.get(`${roomUrl}/${id}`);
  }

  createNew(data): Observable<any> {
    return this.httpClient.post(roomUrl, data);
  }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${roomUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${roomUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(roomUrl);
  }

  searchByName(name): Observable<any> {
    return this.httpClient.get(`${roomUrl}?name=${name}`);
  }

}
