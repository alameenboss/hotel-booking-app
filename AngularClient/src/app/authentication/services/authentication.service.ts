import { ExternalAuthDto } from '../_model/externalAuth/externalAuthDto.model';
import { TwoFactorDto } from '../_model/twoFactor/twoFactorDto.model';
import { ResetPasswordDto } from '../_model/resetPassword/resetPasswordDto.model';
import { ForgotPasswordDto } from '../_model/resetPassword/forgotPasswordDto.model';
import { AuthResponseDto } from '../_model/response/authResponseDto.model';
import { RegistrationResponseDto } from '../_model/response/registrationResponseDto.model';
import { UserForAuthenticationDto } from '../_model/user/userForAuthenticationDto.model';
import { UserForRegistrationDto } from '../_model/user/userForRegistrationDto.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomEncoder } from '../custom-encoder';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  baseUrl;
  constructor(private _http: HttpClient,
    private _jwtHelper: JwtHelperService, private _externalAuthService: SocialAuthService) {
    this.baseUrl = environment.identityServerUrl;

  }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this.baseUrl), body);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this.baseUrl), body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public forgotPassword = (route: string, body: ForgotPasswordDto) => {
    return this._http.post(this.createCompleteRoute(route, this.baseUrl), body);
  }

  public resetPassword = (route: string, body: ResetPasswordDto) => {
    return this._http.post(this.createCompleteRoute(route, this.baseUrl), body);
  }

  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this._http.get(this.createCompleteRoute(route, this.baseUrl), { params: params });
  }

  public twoStepLogin = (route: string, body: TwoFactorDto) => {
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this.baseUrl), body);
  }

  public signInWithGoogle = () => {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }

  public externalLogin = (route: string, body: ExternalAuthDto) => {
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this.baseUrl), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    const isUserAuthenticated = token && !this._jwtHelper.isTokenExpired(token);
    return isUserAuthenticated;
  }

  private checkRole(_role: string) {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token);
    const role = decodedToken != null ? decodedToken['role'] : '';
    return role === _role;
  }

  public isUserAdmin = (): boolean => this.checkRole('Administrator');
  public isUserMember = (): boolean => this.checkRole('Member');


  public currentUserId = (): string => {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token);
    return decodedToken['id'];
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  // public currentUserName = (): string => {
  //   const token = localStorage.getItem("token");
  //   const decodedToken = this._jwtHelper.decodeToken(token);
  //   return decodedToken['email'];
  // }

  // public currentUserRole = (): string => {
  //   const token = localStorage.getItem("token");
  //   const decodedToken = this._jwtHelper.decodeToken(token);
  //   return decodedToken['role'];
  // }
}
