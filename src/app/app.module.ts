import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './layout/core.module';
import { AnimalModule } from './modules/animal/animal.module';
import { AnimalRoutingModule } from './modules/animal/animal-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    UserRoutingModule,
    AnimalRoutingModule,
    CoreModule,
    AnimalModule,
    AnimalModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
