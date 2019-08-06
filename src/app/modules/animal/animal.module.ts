import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalCreatorComponent } from './components/animal-creator/animal-creator.component';
import { SharedModule } from '../shared/shared.module';
import { CatDataService } from './services/cat-data.service';
import { AnimalTableComponent } from '../shared/components/animal-table/animal-table.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

@NgModule({
  declarations: [
    AnimalCreatorComponent,
    AnimalTableComponent,
    AnimalsComponent,
    AnimalDetailsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule],
  providers: [CatDataService],
  exports: [AnimalTableComponent]
})
export class AnimalModule {}
