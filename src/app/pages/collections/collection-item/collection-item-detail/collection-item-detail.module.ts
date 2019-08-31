import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DisqusModule } from 'ngx-disqus';

import { SharedModule } from 'src/app/shared/shared.module';

import { CollectionItemDetailComponent } from './collection-item-detail.component';



@NgModule({
  declarations: [CollectionItemDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    DisqusModule,
    RouterModule.forChild([{path: '', component: CollectionItemDetailComponent}])
  ],
  exports: [RouterModule],
})
export class CollectionItemDetailModule { }
