import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  menulist: any[];
  public isUserAuthenticated: boolean;
  public isExternalAuth: boolean;

  public isMember: boolean = false;
  public isAdmin: boolean = false;
  constructor(
    public _authService: AuthenticationService,
    private _router: Router,
    private _socialAuthService: SocialAuthService,
    private breakpointObserver: BreakpointObserver,
    private _overlayContainer: OverlayContainer) {
    this.checkUserAuthenticated();
    this._authService.authChanged.subscribe(res => {
      this.checkUserAuthenticated();
    })
  }

  isDarkTheme: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  checkUserAuthenticated() {
    this.isUserAuthenticated = this._authService.isUserAuthenticated();
    this.isMember = this._authService.isUserMember();
    this.isAdmin = this._authService.isUserAdmin();
    this.loadMenu();
    console.log(new Date())
  }



  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
    this.changeTheme('dark-theme-mode');
    this._authService.authChanged.subscribe(res => {
      this.checkUserAuthenticated();
    })


    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
    this.changeTheme('dark-theme-mode');
  }

  changeTheme(theme): void {
    //https://stackoverflow.com/a/48431919
    // remove old theme class and add new theme class
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    this.isDarkTheme ? overlayContainerClasses.add(theme) : overlayContainerClasses.remove(theme);
  }

  loadMenu() {

    const menu = [
      //{ "icon": "home", "path": "/default//home", "title": "Home" },
      //{ "icon": "security", "path": "/default/privacy", "title": "Privacy", "role": "admin" },
      //{ "icon": "dashboard", "path": "/default/landing", "title": "Landing"},
      //{ "icon": "build", "path": "/default/welcome", "title": "Welcome" },
      //{ "icon": "account_box", "path": "/authentication/profile", "title": "Account", "role": "admin" },
      //{ "icon": "business", "path": "/company/companies", "title": "Companies", "role": "admin" },
      { "icon": "local_hotel", "path": "roombooking/book-room", "title": "Book Room", "role": "member" },
      { "icon": "room", "path": "room/dashboard", "title": "Dashboard", "role": "admin" },
      { "icon": "local_hotel", "path": "room/room-list", "title": "Rooms", "role": "admin" },
      { "icon": "pages", "path": "game", "title": "Flip Card Game" },
      //{ "icon": "pages", "path": "post", "title": "Posts" },
      { "icon": "person", "path": "user", "title": "Users", "role": "admin" },
      //{ "icon": "ac_unit", "path": "ui", "title": "UI"},
    ];

    const _role = this.isAdmin ? "admin" : this.isMember ? "member" : "";
    this.menulist = menu.filter(x => x.role == _role || x.role == undefined)
  }

  public logout = () => {
    this._authService.logout();

    if (this.isExternalAuth)
      this._authService.signOutExternal();

    this._router.navigate(["/"]);
  }

}
