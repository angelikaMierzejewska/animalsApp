import { Deserializable } from '../interfaces/Deserializable';

export class CatBreed implements Deserializable {
  id: string;
  name: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
