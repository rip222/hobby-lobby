import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';

import { NavbarComponent } from './navbar.component';
import { SearchComponent } from './search/search.component';
import { SearchFieldComponent } from './search/search-field/search-field.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SearchFieldComponent,
    SearchResultsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,

  ],
  exports: [
    NavbarComponent,
    SearchComponent
  ]
})
export class NavbarModule { }
