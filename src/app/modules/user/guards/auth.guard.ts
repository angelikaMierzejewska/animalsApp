import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserDataService } from '../../shared/services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserDataService, public router: Router) {}

  public canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
