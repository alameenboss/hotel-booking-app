import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { companyUrl } from '../apiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(public httpClient: HttpClient) {

  }

  getDeals(): Observable<any> {
    const cards = {
      "handsetCards": [
        {
          "cols": 2, "rows": 1, "title": "Some Text1", "imageName": "water"
        },
        {
          "cols": 2, "rows": 1, "title": "Some Text2", "imageName": "water"
        },
        {
          "cols": 2, "rows": 1, "title": "Some Text3", "imageName": "water"
        },
        {
          "cols": 2, "rows": 1, "title": "Some Text4", "imageName": "water"
        },
      ], "webCards": [
        {
          "cols": 2, "rows": 1, "title": "Some Text1", "imageName": "water"
        },
        {
          "cols": 1, "rows": 1, "title": "Some Text2", "imageName": "water"
        },
        {
          "cols": 1, "rows": 2, "title": "Some Text3", "imageName": "water"
        },
        {
          "cols": 1, "rows": 1, "title": "Some Text4", "imageName": "water"
        },
      ]
    }

    return of<any>(cards)
    //return this.httpClient.get('http://localhost:3000/deals');
  }

  public getClaims = () => {
    const url = `${companyUrl}/privacy`
    return this.httpClient.get(url);
  }

}
