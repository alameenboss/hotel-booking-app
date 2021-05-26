import { ExternalAuthDto } from './../../_interfaces/externalAuth/externalAuthDto.model';
import { UserForAuthenticationDto } from './../../_interfaces/user/userForAuthenticationDto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialUser } from 'angularx-social-login';
import { AlertService } from 'ngx-alerts';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  constructor(
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private _authService: AuthenticationService, 
    private _router: Router, 
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password,
      clientURI: 'http://localhost:4200/authentication/forgotpassword'
    }
    this.alertService.info('Checking User Info');
    this.progressBar.startLoading();
    this._authService.loginUser('api/accounts/login', userForAuth)
      .subscribe(res => {
        this.progressBar.setSuccess();
        this.alertService.success('Logged In');
        if (res.is2StepVerificationRequired) {
          this._router.navigate(['/authentication/twostepverification'],
            { queryParams: { returnUrl: this._returnUrl, provider: res.provider, email: userForAuth.email } });
        }
        else {
          localStorage.setItem("token", res.token);
          this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this._router.navigate([this._returnUrl]);
        }
        this.progressBar.completeLoading();
      },
        (error) => {
          this.progressBar.setError();
          console.log(error);
          this.alertService.danger('Unable to Login');
          this.progressBar.completeLoading();
          this.errorMessage = error;
          this.showError = true;
        })
  }

  public externalLogin = () => {
    this.showError = false;
    this.alertService.info('Checking User Info');
    this.progressBar.startLoading();
    this._authService.signInWithGoogle()
      .then(res => {
        const user: SocialUser = { ...res };
        console.log(user);
        const externalAuth: ExternalAuthDto = {
          provider: user.provider,
          idToken: user.idToken
        }
        
        this.validateExternalAuth(externalAuth);
      }, error => {
          this.progressBar.setError();
          console.log(error);
          this.alertService.danger('Unable to Login');
          this.progressBar.completeLoading();
      })
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.alertService.info('Validating Login');
    this._authService.externalLogin('api/accounts/externallogin', externalAuth)
      .subscribe(res => {
        this.alertService.success('Logged In');
        this.progressBar.setSuccess();
        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.progressBar.completeLoading();
        this._router.navigate([this._returnUrl]);
      },
        error => {
          this.errorMessage = error;
          this.showError = true;
          this.progressBar.setError();
          console.log(error);
          this.alertService.danger('Unable to Login');
          this.progressBar.completeLoading();
          this._authService.signOutExternal();
        });
  }
}
