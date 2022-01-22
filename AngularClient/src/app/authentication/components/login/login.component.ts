import { ExternalAuthDto } from '../../_model/externalAuth/externalAuthDto.model';
import { UserForAuthenticationDto } from '../../_model/user/userForAuthenticationDto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialUser } from 'angularx-social-login';
import { NotifierService } from 'src/app/shared/notifier/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  constructor(
    private notifierService: NotifierService,
    private _authService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("superadmin@gmail.com", [Validators.required, Validators.email]),
      password: new FormControl("Test@123", [Validators.required])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/room/dashboard';
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
    this.notifierService.info('Checking User Info');
    this._authService.loginUser('api/accounts/login', userForAuth)
      .subscribe(res => {

        this.notifierService.showNotification('Logged In', 'Ok', 'success');
        if (res.is2StepVerificationRequired) {
          this._router.navigate(['/authentication/twostepverification'],
            { queryParams: { returnUrl: this._returnUrl, provider: res.provider, email: userForAuth.email } });
        }
        else {
          localStorage.setItem("token", res.token);
          this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this._router.navigate([this._returnUrl]);
        }

      },
        (error) => {

          this.notifierService.showNotification('Unable to Login', 'Ok', 'error');

          this.errorMessage = error;
          this.showError = true;
        })
  }

  public externalLogin = (provider: string) => {
    this.showError = false;
    this.notifierService.info('Checking User Info');

    if(provider == 'google'){
      this._authService.signInWithGoogle()
      .then(res => {
        const user: SocialUser = { ...res };
        const externalAuth: ExternalAuthDto = {
          provider: user.provider,
          idToken: user.idToken
        }

        this.validateExternalAuth(externalAuth);
      }, error => {
        this.notifierService.showNotification('Unable to Login', 'Ok', 'error');
      })
    }
    else{
      this.notifierService.showNotification('Provider not supported','Ok','error');
    }
    
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.notifierService.info('Validating Login');
    this._authService.externalLogin('api/accounts/externallogin', externalAuth)
      .subscribe(res => {
        this.notifierService.showNotification('Logged In', 'Ok', "success");

        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);

        this._router.navigate([this._returnUrl]);
      },
        error => {
          this.errorMessage = error;
          this.showError = true;

          this.notifierService.showNotification('Unable to Login', 'Ok', 'error');

          this._authService.signOutExternal();
        });
  }
}
