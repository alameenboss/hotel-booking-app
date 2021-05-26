import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyBookingComponent } from './components/my-booking/my-booking.component';
import { AddEditRoomComponent } from './components/room/add-edit-room/add-edit-room.component';
import { BookRoomComponent } from './components/room/book-room/book-room.component';
import { RoomListComponent } from './components/room/room-list/room-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { MemberGuard } from './shared/guards/member.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule), canActivate: [AuthGuard] },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Dashboard Page' } },
  { path: 'room-list', component: RoomListComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Room List' } },
  { path: 'add-room', component: AddEditRoomComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Add Room' } },
  { path: 'edit-room/:id', component: AddEditRoomComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Edit Room' } },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'User List' } },
  { path: 'book-room', component: BookRoomComponent, canActivate: [AuthGuard, MemberGuard], data: { title: 'Book Room' } },
  { path: 'my-booking', component: MyBookingComponent, canActivate: [AuthGuard, MemberGuard], data: { title: 'Book Room' } },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
