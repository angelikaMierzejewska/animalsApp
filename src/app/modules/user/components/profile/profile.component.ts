import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/resources/models/user';
import { Router } from '@angular/router';
import { UserDataService } from '../../../shared/services/user-data.service';
import { AnimalDataService } from '../../../shared/services/animal-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user: User;
  private isLoading = false;
  private animals = [];

  constructor(
    private userDataSerice: UserDataService,
    private router: Router,
    private animalService: AnimalDataService
  ) {}

  public ngOnInit(): void {
    this.getUserData();
  }

  public getUserData(): void {
    this.isLoading = true;
    this.userDataSerice.getUserByToken().subscribe(
      data => {
        this.isLoading = false;
        this.user = data;
        this.getUserDogs(data.id);
      },
      e => {
        console.error(e);
      }
    );
  }

  public getUserDogs(id): void {
    this.animals = this.animalService.getUserAnimals(id);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
