import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/resources/models/user';
import { DogDataService } from '../../services/dog-data.service';
import { UserDataService } from '../../../shared/services/user-data.service';
import { AnimalDataService } from '../../../shared/services/animal-data.service';
import { Animal } from '../../resources/models/Animal';
import { DogBreed } from '../../resources/models/DogBreed';
import { CatBreed } from '../../resources/models/CatBreed';
import { Subscription } from 'rxjs';
import { AnimalActions } from '../../resources/enum/animal-actions.enum';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss']
})
export class AnimalDetailsComponent implements OnInit, OnDestroy {
  private animal: Animal;
  private allBreedsSub: Subscription;
  private imgBreedSub: Subscription;
  private showEditForm = false;
  private showLabel = false;
  private users: User[];
  private breeds: string[];
  private allBreeds;
  private subBreeds: string[];

  private fed = false;
  private badgeAction = '';

  private animalForm = this.formBuilder.group({
    name: ['', Validators.required],
    breed: ['', [Validators.required]],
    subBreed: [''],
    owner: ['', [Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserDataService,
    private dogService: DogDataService,
    private animalService: AnimalDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAnimal();
    this.getAllUsers();
    this.getAllBreeds();
    this.allBreadsSubscription();
    this.imgBreedSubscription();
  }

  ngOnDestroy(): void {
    this.allBreedsSub.unsubscribe();
    this.imgBreedSub.unsubscribe();
  }

  getAnimal(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');
    this.animal = this.animalService.getAnimal(type, id);
    if (this.animal.action !== '') {
      this.badgeAction = '1';
    }
  }

  editAnimal(): void {
    this.showEditForm = !this.showEditForm;
    this.showLabel = !this.showLabel;
    if (this.showEditForm) {
      this.animalForm.setValue({
        name: this.animal.name,
        breed: this.animal.breed,
        subBreed: this.animal.subBreed ? this.animal.subBreed : '',
        owner: this.animal.owner
      });
    }
    this.changeBreed();
  }

  public getAllUsers(): void {
    this.users = this.userService.getAllUsers();
  }

  public submit(): void {
    const selectedBreed = this.animalForm.value.breed;
    const selectedSubBreed = this.animalForm.value.subBreed;
    const animalType = this.animal.type;

    if (animalType === 'cat') {
      const cat: CatBreed = this.allBreeds.find((c: CatBreed) => c.name === selectedBreed);
      this.animalService.getAnimalImage(animalType, cat.id);
    } else {
      selectedSubBreed
        ? this.animalService.getAnimalImage(animalType, selectedBreed, selectedSubBreed)
        : this.animalService.getAnimalImage(animalType, selectedBreed);
    }
  }

  public allBreadsSubscription(): void {
    this.allBreedsSub = this.animalService.allBreeds.subscribe(
      (allBreeds: DogBreed[] | CatBreed[]) => {
        if (this.animal.type === 'cat') {
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
      this.updateAnimal(imgBreed);
    });
  }

  public getAllBreeds(): void {
    this.animalService.getAllBreeds(this.animal.type);
  }

  public changeBreed(): void {
    this.subBreeds = [];
    const selectedBreed = this.animalForm.get('breed').value;
    if (this.animal.type === 'dog') {
      if (this.allBreeds[selectedBreed].length > 0) {
        this.subBreeds = this.allBreeds[selectedBreed];
      }
    }
  }

  public updateAnimal(imgBreed: string): void {
    this.animalService.updateAnimal(this.animalForm.value, imgBreed, this.animal);
    this.animalForm.reset();
    this.router.navigate(['animals']);
  }

  public nextDay(): void {
    if (this.animal.action === 'feed') {
      this.animal.action = 'DEATH';

      this.animalService.deleteAnimal(this.animal);
      this.openSnackBar(`${this.animal.name} has died `, 'X');
      this.router.navigate(['animals']);
    } else {
      this.animal.lifeDays = this.animal.lifeDays + 1;
      const actions = Object.keys(AnimalActions);
      const random = actions[Math.floor(Math.random() * actions.length)];
      this.animal.action = AnimalActions[random];
      this.badgeAction = '1';

      this.fed = false;
    }
  }

  public animalAction(): void {
    this.animal.action = '';
    this.badgeAction = '';
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
