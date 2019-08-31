import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { CollectionsComponent } from './collections.component';

@NgModule({
  declarations: [
    CollectionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([ { path: '', component: CollectionsComponent } ]),
  ],
  exports: [RouterModule],
})
export class CollectionsModule { }
