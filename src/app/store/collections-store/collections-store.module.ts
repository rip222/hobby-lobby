import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './collections.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects } from './collections.effects';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('data', reducers),
    EffectsModule.forFeature([CollectionsEffects]),
  ]
})
export class CollectionsStoreModule { }
