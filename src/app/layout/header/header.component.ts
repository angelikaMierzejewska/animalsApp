import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../modules/shared/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private user: UserDataService) {}

  ngOnInit() {}

  public isAuthenticated() {}
}
