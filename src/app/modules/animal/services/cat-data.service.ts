import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CatImage } from '../resources/models/CatImage';
import { CatBreedsData } from '../resources/interfaces/CatBreedsData';
import { Cat } from '../resources/models/Cat';
import { CatBreed } from '../resources/models/CatBreed';
import { map } from 'rxjs/operators';
import { AnimalActions } from '../resources/enum/animal-actions.enum';
import { Dog } from '../resources/models/Dog';

@Injectable({
  providedIn: 'root'
})
export class CatDataService {
  private cats: Cat[] = [];
  private id = 1;

  constructor(private http: HttpClient) {}

  public getAllBreeds(): Observable<CatBreed[]> {
    const url = 'https://api.thecatapi.com/v1/breeds';
    return this.http
      .get<CatBreedsData[]>(url)
      .pipe(
        map((data: CatBreedsData[]) =>
          data.map((breed: CatBreedsData) =>
            new CatBreed().deserialize({ name: breed.name, id: breed.id })
          )
        )
      );
  }

  public getCatImg(id: string): Observable<CatImage> {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`;
    return this.http.get<any>(url);
  }

  public createCat(cat: Cat, img: string): void {
    const newCat = new Cat(cat.type, cat.name, cat.breed, cat.owner, img);
    newCat.id = this.id;

    this.setRandomAction(newCat);

    this.cats.push(newCat);
    localStorage.setItem('cats', JSON.stringify(this.cats));
    this.id++;
  }

  public setRandomAction(newCat: Cat): void {
    const actions = Object.keys(AnimalActions);
    const random = actions[Math.floor(Math.random() * actions.length)];
    newCat.action = AnimalActions[random];
  }

  public setCatAction(action: string, id): void {
    const allCats = this.getAllCats();
    const cat = allCats.find(cat => cat.id === id);
    cat.setAction(action);
  }

  public getAllCats(): Cat[] {
    const catsObj = JSON.parse(localStorage.getItem('cats'));
    if (catsObj === null) {
      return [];
    }

    return catsObj;
  }

  public removeCat(id: number): void {
    const allCats = this.getAllCats();
    const cats = allCats.filter(cat => cat.id !== id);
    localStorage.setItem('cats', JSON.stringify(cats));
  }

  public getCat(id: number): Cat {
    const allCats = this.getAllCats();
    return allCats.find(c => c.id === id);
  }

  public updateCat(newcat: Cat, catImg: string, oldcat: Cat): void {
    newcat.url = catImg;
    newcat.id = oldcat.id;
    newcat.type = oldcat.type;
    const allcats = this.getAllCats();
    const cats = allcats.filter(c => c.id !== oldcat.id);
    cats.push(newcat);
    console.log(newcat);
    localStorage.setItem('cats', JSON.stringify(cats));
  }

  public getUserCats(id: number): Dog[] {
    const allCats = this.getAllCats();
    return allCats.filter(d => d.owner === id);
  }
}
