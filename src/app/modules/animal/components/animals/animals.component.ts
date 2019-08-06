import { Component, OnInit } from '@angular/core';
import { Dog } from '../../resources/models/Dog';
import { Cat } from '../../resources/models/Cat';
import { AnimalDataService } from '../../../shared/services/animal-data.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
  private animals: (Cat | Dog)[];

  constructor(private animalService: AnimalDataService) {}

  ngOnInit(): void {
    this.getAllAnimlas();
  }

  getAllAnimlas(): void {
    this.animals = this.animalService.getAllAnimals();
  }
}
