import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { companyUrl } from 'src/app/shared/apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {

  }

  public getCompanies = () => {
    const url = `${companyUrl}`
    return this.http.get(url);
  }



}