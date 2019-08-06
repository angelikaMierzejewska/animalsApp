import { Injectable } from '@angular/core';
import { CatDataService } from '../../animal/services/cat-data.service';
import { DogDataService } from '../../animal/services/dog-data.service';
import { DogBreed } from '../../animal/resources/models/DogBreed';
import { AnimalType } from '../../animal/resources/enum/animal-type.enum';
import { CatBreed } from '../../animal/resources/models/CatBreed';
import { Subject } from 'rxjs';
import { DogBreedsData } from '../../animal/resources/interfaces/DogBreedsData';
import { Cat } from '../../animal/resources/models/Cat';
import { Dog } from '../../animal/resources/models/Dog';

@Injectable({
  providedIn: 'root'
})
export class AnimalDataService {
  public allBreeds = new Subject<DogBreed[] | CatBreed[]>();
  public imgBreed = new Subject<string>();

  constructor(private catService: CatDataService, private dogService: DogDataService) {}

  public getAllBreeds(animal: string) {
    switch (animal) {
      case AnimalType.Cat:
        this.catService.getAllBreeds().subscribe((data: CatBreed[]) => {
          this.allBreeds.next(data);
        });
        break;
      case AnimalType.Dog:
        this.dogService.getAllBreeds().subscribe((data: DogBreedsData) => {
          this.allBreeds.next(data.message);
        });
        break;
      default:
        console.log('Sorry, we are out of ' + animal + '.');
    }
  }

  public getAnimalImage(animal: string, breed: string, subBreed?: string) {
    switch (animal) {
      case AnimalType.Cat:
        console.log('cat!');
        this.catService.getCatImg(breed).subscribe(data => {
          this.imgBreed.next(data[0].url);
        });
        break;
      case AnimalType.Dog:
        console.log('dog!');
        if (subBreed) {
          this.dogService.getSubBreedImage(breed, subBreed).subscribe(data => {
            this.imgBreed.next(data.message);
          });
        } else {
          console.log('dog!');
          this.dogService.getBreedImage(breed).subscribe(data => {
            this.imgBreed.next(data.message);
          });
        }
        break;
      default:
        console.log('Sorry, we are out of ' + animal + '.');
    }
  }

  public createAnimal(animal, img) {
    switch (animal.type) {
      case AnimalType.Cat:
        this.catService.createCat(animal, img);
        break;
      case AnimalType.Dog:
        this.dogService.createDog(animal, img);
        break;
      default:
        console.log('Sorry, we are out of ' + animal.type + '.');
    }
  }

  public getAllAnimals(): (Cat | Dog)[] {
    const cats = this.catService.getAllCats();
    const dogs = this.dogService.getAllDogs();
    const animals: (Cat | Dog)[] = [...cats, ...dogs];

    return animals;
  }

  public deleteAnimal(animal): void {
    switch (animal.type) {
      case AnimalType.Cat:
        this.catService.removeCat(animal.id);

        break;
      case AnimalType.Dog:
        this.dogService.removeDog(animal.id);
        break;
      default:
        console.log('Sorry, we are out of ' + animal.type + '.');
    }
  }

  public getAnimal(type: string, id: number): Dog | Cat {
    switch (type) {
      case AnimalType.Cat:
        return this.catService.getCat(id);
        break;
      case AnimalType.Dog:
        return this.dogService.getDog(id);
        break;
      default:
        console.log('Sorry, we are out of ' + type + '.');
    }
  }

  public updateAnimal(newAnimal, img: string, animal: Cat | Dog) {
    switch (animal.type) {
      case AnimalType.Cat:
        return this.catService.updateCat(newAnimal, img, animal);
        break;
      case AnimalType.Dog:
        return this.dogService.updateDog(newAnimal, img, animal);
        break;
      default:
        console.log('Sorry, we are out of ' + animal + '.');
    }
  }

  public getUserAnimals(id: number) {
    const dogs: Dog[] = this.dogService.getUserDogs(id);
    const cats: Cat[] = this.catService.getUserCats(id);
    const animals: (Cat | Dog)[] = [...cats, ...dogs];
    return animals;
  }
}
