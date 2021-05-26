import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgProgress } from "@ngx-progressbar/core";
import { AlertService } from "ngx-alerts";
import { ProgressBarService } from '../shared/services/progress-bar.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isUserAuthenticated: boolean;
  public isExternalAuth: boolean;

  public isMember:boolean=false;
  public isAdmin:boolean=false;

  constructor(
    private progress: NgProgress,
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    public _authService: AuthenticationService, private _router: Router, 
    private _socialAuthService: SocialAuthService) { 
    this._authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref("progressBar");
    this._authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
      this.isMember = this._authService.isUserMember();
      this.isAdmin = this._authService.isUserAdmin();
      
    })

    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })
  }

  public logout = () => {
    this._authService.logout();

    if(this.isExternalAuth)
      this._authService.signOutExternal();

    this._router.navigate(["/"]);
  }

}
