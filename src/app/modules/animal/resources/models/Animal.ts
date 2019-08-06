import { AnimalType } from '../enum/animal-type.enum';

export abstract class Animal {
  type: AnimalType;
  id: number;
  name: string;
  breed: string;
  subBreed?: string;
  owner: number;
  url: string;
  lifeDays: number;
  action?: string;

  constructor(type, name, breed, owner, url) {
    this.type = type;
    this.name = name;
    this.breed = breed;
    this.owner = owner;
    this.url = url;
    this.lifeDays = 1;
  }

  public setAction(newAction: string): void {}
}
