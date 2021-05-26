import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  apiUri;

  constructor(private http: HttpClient,
    private envUrl: EnvironmentUrlService) {
      debugger;
    this.apiUri = this.envUrl.urlAddress + '/api';
  }

  public getCompanies = () => {
    debugger;
    const url = `${this.apiUri}/companies`
    return this.http.get(url);
  }

  public getClaims = () => {
    debugger;
    const url = `${this.apiUri}/companies/privacy`
    return this.http.get(url);
  }

}