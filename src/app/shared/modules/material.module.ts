import { NgModule } from '@angular/core';
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
  MatButtonModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatDialogModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatChipsModule,
  MatIconModule,
  MatExpansionModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    // Form Controls
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    // Navigation
    MatMenuModule,
    // Layout
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    // Buttons & Indicators
    MatButtonModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    // PopUps & Modals
    MatSnackBarModule,
    MatDialogModule,
  ],
  exports: [
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
})
export class MaterialModule { }
