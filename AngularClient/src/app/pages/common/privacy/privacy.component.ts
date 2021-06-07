import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  public claims: [] = [];

  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () =>{
    this._appService.getClaims()
    .subscribe(res => {
      this.claims = res as [];
    })
  }
}
