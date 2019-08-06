import { Injectable } from '@angular/core';
import { User } from '../../shared/resources/models/user';
import { Dog } from '../resources/models/Dog';
import { UserDataService } from '../../shared/services/user-data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DogBreedsData } from '../resources/interfaces/DogBreedsData';
import { DogImgData } from '../resources/interfaces/DogImgData';
import { Cat } from '../resources/models/Cat';
import { AnimalActions } from '../resources/enum/animal-actions.enum';

@Injectable({
  providedIn: 'root'
})
export class DogDataService {
  private dogs: Dog[] = [];
  private id = 1;
  constructor(private http: HttpClient, private userServcie: UserDataService) {}

  public createDog(dog: Dog, dogImg: string): void {
    const newDog = new Dog(dog.type, dog.name, dog.breed, dog.owner, dogImg);
    newDog.id = this.id;
    if (dog.subBreed) {
      newDog.subBreed = dog.subBreed;
    }

    this.setRandomAction(newDog);

    this.dogs.push(newDog);
    localStorage.setItem('dogs', JSON.stringify(this.dogs));
    this.id++;
  }

  public setRandomAction(newDog: Dog): void {
    const actions = Object.keys(AnimalActions);
    const random = actions[Math.floor(Math.random() * actions.length)];
    newDog.action = AnimalActions[random];
  }

  public updateDog(newDog: Dog, dogImg: string, oldDog: Dog): void {
    newDog.url = dogImg;
    newDog.id = oldDog.id;
    newDog.type = oldDog.type;
    const alldogs = this.getAllDogs();
    const dogs = alldogs.filter(dog => dog.id !== oldDog.id);
    dogs.push(newDog);
    localStorage.setItem('dogs', JSON.stringify(dogs));
  }

  public getAllDogs(): Cat[] {
    const dogObj = JSON.parse(localStorage.getItem('dogs'));

    if (dogObj === null) {
      return [];
    }
    return dogObj;
  }

  public getDog(id: number): Dog {
    const alldogs = this.getAllDogs();
    return alldogs.find(dog => dog.id === id);
  }

  public getUserDogs(id: number): Dog[] {
    const alldogs = this.getAllDogs();
    return alldogs.filter(d => d.owner === id);
  }

  public removeDog(id: number): void {
    const alldogs = this.getAllDogs();
    const dogs = alldogs.filter(dog => dog.id !== id);
    localStorage.setItem('dogs', JSON.stringify(dogs));
  }

  public getAllBreeds(): Observable<DogBreedsData> {
    const url = 'https://dog.ceo/api/breeds/list/all';
    return this.http.get<DogBreedsData>(url);
  }

  public getBreedImage(breed: string): Observable<DogImgData> {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    return this.http.get<DogImgData>(url);
  }

  public getSubBreedImage(breed: string, subBreed: string): Observable<DogImgData> {
    const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
    return this.http.get<DogImgData>(url);
  }
}
