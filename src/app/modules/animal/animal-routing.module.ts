import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { AnimalCreatorComponent } from './components/animal-creator/animal-creator.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

const ANIMAL_ROUTES: Route[] = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'animals', component: AnimalsComponent },
      { path: 'animal-creator', component: AnimalCreatorComponent },
      { path: 'animal/:type/:id', component: AnimalDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ANIMAL_ROUTES)],
  exports: [RouterModule]
})
export class AnimalRoutingModule {}
