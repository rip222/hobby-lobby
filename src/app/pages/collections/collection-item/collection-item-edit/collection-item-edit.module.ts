import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { CollectionItemEditComponent } from './collection-item-edit.component';
import { ItemEditFormComponent } from './item-edit-form/item-edit-form.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ItemToFormService } from 'src/app/services/item-to-form.service';



@NgModule({
  declarations: [
    CollectionItemEditComponent,
    ItemEditFormComponent,
    PhotoUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: CollectionItemEditComponent}])
  ],
  exports: [RouterModule],
  providers: [ItemToFormService]
})
export class CollectionItemEditModule { }
