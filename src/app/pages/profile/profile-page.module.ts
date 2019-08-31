import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { UserColDetailResolver } from './user-collection-detail/user-collection.detail.resolver';
import { CollectionResolver } from '../collections/collection/collection-detail/collection.resolver';
import { UserResolver } from './user.resolver';

import { ProfilePageComponent } from './profile-page.component';
import { CollectionsBlockComponent } from './collections-block/collections-block.component';
import { UserCollectionDetailComponent } from './user-collection-detail/user-collection-detail.component';

const routes: Routes = [
  {
    path: ':uid',
    component: ProfilePageComponent,
    resolve: {user: UserResolver}
  },
  {
    path: ':uid/c/:cid',
    component: UserCollectionDetailComponent,
    resolve: {
      collection: CollectionResolver,
      items: UserColDetailResolver,
      user: UserResolver
    }
  },
];

@NgModule({
  declarations: [
    ProfilePageComponent,
    CollectionsBlockComponent,
    UserCollectionDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [CollectionResolver, UserColDetailResolver, UserResolver]
})
export class ProfilePageModule { }
