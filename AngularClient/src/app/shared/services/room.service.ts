import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl;
  constructor(private httpClient: HttpClient,
    private envUrl: EnvironmentUrlService) {
    this.baseUrl = this.envUrl.urlAddress + '/api/rooms';
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  getById(id): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  createNew(data): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.baseUrl);
  }

  searchByName(name): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}?name=${name}`);
  }

}
