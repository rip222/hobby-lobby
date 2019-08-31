import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DisqusModule } from 'ngx-disqus';

import { SharedModule } from 'src/app/shared/shared.module';

import { CollectionDetailComponent } from './collection-detail.component';

@NgModule({
  declarations: [CollectionDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    DisqusModule,
    RouterModule.forChild([{ path: '', component: CollectionDetailComponent }])
  ],
  exports: [RouterModule],
})
export class CollectionDetailModule { }
