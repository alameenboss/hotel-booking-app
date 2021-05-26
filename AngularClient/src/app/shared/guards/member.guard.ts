import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {

  constructor(private _authService: AuthenticationService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this._authService.isUserMember())
      return true;

    this._router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
