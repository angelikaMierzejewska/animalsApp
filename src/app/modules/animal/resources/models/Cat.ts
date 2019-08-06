import { Animal } from './Animal';
import { User } from '../../../shared/resources/models/user';

export class Cat extends Animal {
  constructor(type: string, name: string, breed: string, owner: number, url: string) {
    super(type, name, breed, owner, url);
  }
}
