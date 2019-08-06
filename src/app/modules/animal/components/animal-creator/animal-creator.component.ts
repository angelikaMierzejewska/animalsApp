import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/resources/models/user';
import { DogBreed } from '../../resources/models/DogBreed';
import { AnimalType } from '../../resources/enum/animal-type.enum';
import { AnimalDataService } from '../../../shared/services/animal-data.service';
import { CatBreed } from '../../resources/models/CatBreed';
import { UserDataService } from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-animal-creator',
  templateUrl: './animal-creator.component.html',
  styleUrls: ['./animal-creator.component.scss']
})
export class AnimalCreatorComponent implements OnInit, OnDestroy {
  private animals: string[];
  private users: User[];
  private breeds: string[];
  private subBreeds: string[];
  private allBreeds: any;
  // private allBreeds: DogBreed[] | CatBreed[];
  private animalForm = this.formBuilder.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    breed: ['', [Validators.required]],
    subBreed: [''],
    owner: ['', [Validators.required]]
  });
  private allBreedsSub: Subscription;
  private imgBreedSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserDataService,
    private snackBar: MatSnackBar,
    private animalService: AnimalDataService
  ) {}

  ngOnInit(): void {
    this.getAllAnimals();
    this.getAllUsers();

    this.allBreadsSubscription();
    this.imgBreedSubscription();
  }

  ngOnDestroy(): void {
    this.allBreedsSub.unsubscribe();
    this.imgBreedSub.unsubscribe();
  }

  public allBreadsSubscription(): void {
    this.allBreedsSub = this.animalService.allBreeds.subscribe(
      (allBreeds: DogBreed[] | CatBreed[]) => {
        if (this.animalForm.value.type === 'cat') {
          const allBreedsTemp = Object.values(allBreeds);
          this.allBreeds = allBreeds;
          this.breeds = allBreedsTemp.map(breed => breed.name);
        } else {
          this.allBreeds = allBreeds;
          this.breeds = Object.keys(allBreeds);
        }
      }
    );
  }

  public imgBreedSubscription(): void {
    this.imgBreedSub = this.animalService.imgBreed.subscribe(imgBreed => {
      this.createAnimal(imgBreed);
    });
  }

  public getAllAnimals(): void {
    this.animals = Object.values(AnimalType);
  }

  public getAllUsers(): void {
    this.users = this.userService.getAllUsers();
  }

  public submit(): void {
    if (this.animalForm.dirty && this.animalForm.valid) {
      this.getBreedImage();
    }
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  public getAllBreeds(): void {
    const animalType = this.animalForm.value.type;
    this.animalService.getAllBreeds(animalType);
  }

  public changeBreed(): void {
    this.subBreeds = [];
    const selectedBreed = this.animalForm.get('breed').value;
    if (this.animalForm.value.type === 'dog' && this.allBreeds[selectedBreed].length > 0) {
      this.subBreeds = this.allBreeds[selectedBreed];
    }
  }

  public getBreedImage(): void {
    const selectedBreed = this.animalForm.value.breed;
    const selectedSubBreed = this.animalForm.value.subBreed;
    const animalType = this.animalForm.value.type;

    if (animalType === 'cat') {
      const cat: CatBreed = this.allBreeds.find((c: CatBreed) => c.name === selectedBreed);
      this.animalService.getAnimalImage(animalType, cat.id);
    } else {
      selectedSubBreed
        ? this.animalService.getAnimalImage(animalType, selectedBreed, selectedSubBreed)
        : this.animalService.getAnimalImage(animalType, selectedBreed);
    }
  }

  public createAnimal(imgBreed: string): void {
    this.animalService.createAnimal(this.animalForm.value, imgBreed);
    this.animalForm.reset();
    this.openSnackBar('Success', 'X');
    this.router.navigate(['animals']);
  }
}
