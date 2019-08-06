import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatIconModule,
  MatBadgeModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule
  ]
})
export class SharedModule {}
