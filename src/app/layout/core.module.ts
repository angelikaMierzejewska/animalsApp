import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../modules/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { UserModule } from '../modules/user/user.module';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, UserModule],
  declarations: [SidebarComponent, HeaderComponent],
  exports: [SidebarComponent, HeaderComponent]
})
export class CoreModule {}
