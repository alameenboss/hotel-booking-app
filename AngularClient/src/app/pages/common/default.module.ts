import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminGuard } from 'src/app/authentication/guards/admin.guard';
import { AuthGuard } from 'src/app/authentication/guards/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchRoomComponent } from './searchroom/searchroom.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingPageComponent,
    PrivacyComponent,
    WelcomeComponent,
    SearchRoomComponent
  ],
  exports: [
    HomeComponent,
    LandingPageComponent,
    PrivacyComponent,
    WelcomeComponent,
    SearchRoomComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'searchroom/:from/:to/:type', component: SearchRoomComponent },
      { path: 'landing', component: LandingPageComponent },
      { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'welcome', component: WelcomeComponent }
    ])
  ]
})
export class DefaultModule { }
