import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl;
  constructor(private httpClient: HttpClient,
    private envUrl: EnvironmentUrlService) {
    this.baseUrl = this.envUrl.urlAddress + '/api/users';
  }

  getalluser(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  makeuseradmin(userId): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/makeuseradmin?userId=${userId}`,{});
  }

}
