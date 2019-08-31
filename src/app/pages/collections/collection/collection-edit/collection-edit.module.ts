import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { CollectionEditComponent } from './collection-edit.component';

@NgModule({
  declarations: [
    CollectionEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: CollectionEditComponent}])
  ],
  exports: [RouterModule]
})
export class CollectionEditModule { }
