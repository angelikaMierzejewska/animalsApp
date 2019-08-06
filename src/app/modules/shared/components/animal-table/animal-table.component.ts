import { Component, Input, OnInit } from '@angular/core';
import { DogDataService } from '../../../animal/services/dog-data.service';
import { Router } from '@angular/router';
import { Dog } from '../../../animal/resources/models/Dog';
import { Animal } from '../../../animal/resources/models/Animal';
import { AnimalDataService } from '../../services/animal-data.service';
import { Cat } from '../../../animal/resources/models/Cat';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../resources/models/user';

@Component({
  selector: 'app-animal-table',
  templateUrl: './animal-table.component.html',
  styleUrls: ['./animal-table.component.scss']
})
export class AnimalTableComponent implements OnInit {
  private allUsers: User[];
  private displayedColumns: string[] = [
    'type',
    'name',
    'breed',
    'subBreed',
    'owner',
    'image',
    'show',
    'remove'
  ];

  @Input() animals: Animal[];

  constructor(
    private animalService: AnimalDataService,
    private dogService: DogDataService,
    private router: Router,
    private userServcie: UserDataService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public remove(animal: Cat | Dog): void {
    this.animalService.deleteAnimal(animal);
    this.animals = this.animalService.getAllAnimals();
  }

  public showAnimalDetail(animal: Cat | Dog): void {
    this.router.navigate([`/animal/${animal.type}/${animal.id}`]);
  }

  public getUsers() {
    this.allUsers = this.userServcie.getAllUsers();
  }
}
