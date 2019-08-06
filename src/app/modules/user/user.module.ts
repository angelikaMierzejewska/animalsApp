import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AnimalModule } from '../animal/animal.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, AnimalModule]
})
export class UserModule {}
