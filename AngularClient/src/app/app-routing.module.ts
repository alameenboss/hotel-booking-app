import { AdminGuard } from 'src/app/authentication/guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';
import { MemberGuard } from './authentication/guards/member.guard';

const routes: Routes = [
  { path: 'default', loadChildren: () => import('./pages/common/default.module').then(m => m.DefaultModule) },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'company', loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule), canActivate: [AuthGuard] },
  { path: 'roombooking', loadChildren: () => import('./pages/room-booking/roombooking.module').then(m => m.RoomBookingModule), canActivate: [AuthGuard, MemberGuard] },
  { path: 'room', loadChildren: () => import('./pages/room/room.module').then(m => m.RoomModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'ui', loadChildren: () => import('./pages/ui-testing/ui.module').then(m => m.UIModule) },
  { path: 'post', loadChildren: () => import('./pages/posts/post.module').then(m => m.PostModule) },
  { path: 'user', loadChildren: () => import('./pages/users/user.module').then(m => m.UserModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'error', loadChildren: () => import('./pages/error-pages/error.module').then(m => m.ErrorModule) },
  { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
  { path: '', redirectTo: '/default', pathMatch: 'full' },
  { path: '**', redirectTo: '/error/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }