import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TwoStepVerificationComponent } from './components/two-step-verification/two-step-verification.component';
import { MaterialModule } from '../shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from './guards/auth.guard';
import { AuthDefaultComponent } from './components/auth-default/auth-default.component';

@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailConfirmationComponent,
    TwoStepVerificationComponent,
    ProfileComponent,
    AuthDefaultComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AuthDefaultComponent, children: [
          { path: 'register', component: RegisterUserComponent },
          { path: 'login', component: LoginComponent },
          { path: 'forgotpassword', component: ForgotPasswordComponent },
          { path: 'resetpassword', component: ResetPasswordComponent, canActivate: [AuthGuard] },
          { path: 'emailconfirmation', component: EmailConfirmationComponent },
          { path: 'twostepverification', component: TwoStepVerificationComponent },
          { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
        ]
      }
    ])
  ]
})
export class AuthenticationModule { }
