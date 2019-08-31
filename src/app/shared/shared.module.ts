import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from './modules/material.module';

// Components
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionItemComponent } from './components/collection-item/collection-item.component';
import { CollectionFrameComponent } from './components/collection-frame/collection-frame.component';
import { ItemFrameComponent } from './components/item-frame/item-frame.component';

// Pipes
import { SplitCamelCasePipe } from './pipes/split-camel-case.pipe';



@NgModule({
  declarations: [
    CollectionComponent,
    CollectionItemComponent,
    CollectionFrameComponent,
    ItemFrameComponent,
    SplitCamelCasePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    CollectionComponent,
    CollectionItemComponent,
    CollectionFrameComponent,
    ItemFrameComponent,
    SplitCamelCasePipe,
  ]
})
export class SharedModule { }
