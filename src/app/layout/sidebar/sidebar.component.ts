import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../modules/shared/services/user-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidenavWidth = 10;
  private sideNav: { name: string; url: string }[] = [
    { name: 'My profile', url: '/profile' },
    { name: 'Animal Creator', url: '/animal-creator' },
    { name: 'Animals', url: '/animals' }
  ];
  private isAuthenticated = false;
  constructor(private userService: UserDataService) {}

  public ngOnInit(): void {
    this.checkIfAuthenticated();
  }

  public checkIfAuthenticated(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
  }
}
