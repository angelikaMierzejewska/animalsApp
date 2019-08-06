import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

const USERS_ROUTES: Route[] = [
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'profile', component: ProfileComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(USERS_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
