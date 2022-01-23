import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usersUrl } from '../../shared/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getalluser(): Observable<any> {
    return this.httpClient.get(`${usersUrl}`);
  }

  makeAdmin(userId): Observable<any> {
    return this.httpClient.post(`${usersUrl}/makeAdmin?userId=${userId}`,{});
  }

  makeMember(userId): Observable<any> {
    return this.httpClient.post(`${usersUrl}/makeMember?userId=${userId}`,{});
  }

  deleteUser(userId:string): Observable<any>{
    return this.httpClient.delete(`${usersUrl}/${userId}`);
  }

}
