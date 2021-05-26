import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList = []
  constructor(
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router,
    private _userService: UserService,
    private _authService: AuthenticationService) { }

  ngOnInit() {
    this.getalluser();
  }

  getalluser() {
    this.progressBar.startLoading();
    this._userService
      .getalluser()
      .subscribe(data=> {
        console.log(data);
        if (data != null) {
          this.progressBar.setSuccess();
          this.userList = data;
          this.alertService.success(`${this.userList.length}('s) users Found!`);
          this.progressBar.completeLoading();
        }
      }, err => {
        console.log(err)
        this.progressBar.setError();
        this.alertService.danger('Error Occured!');
        this.progressBar.completeLoading();
      })
  }

  makeuseradmin(userId){
    this.progressBar.startLoading();
    this._userService.makeuseradmin(userId)
      .subscribe(
        response => {
          console.log(response);
          this.progressBar.setSuccess();
          this.alertService.success('User is now Admin');
          this.progressBar.completeLoading();
        },
        error => {
          console.log(error);
          this.progressBar.setError();
          this.alertService.danger('Not able to make user admin!');
          this.progressBar.completeLoading();
        });
  }


}
