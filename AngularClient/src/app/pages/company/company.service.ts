import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiUri;

  constructor(private http: HttpClient) {
    this.apiUri = environment.urlAddress + '/api';
  }

  public getCompanies = () => {
    const url = `${this.apiUri}/companies`
    return this.http.get(url);
  }



}