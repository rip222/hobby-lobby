import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { CollectionResolver } from './pages/collections/collection/collection-detail/collection.resolver';
import { ColItemResolver } from './pages/collections/collection-item/collection-item-detail/collection-item.resolver';
import { ColItemsResolver } from './pages/collections/collection-item/collection-item-detail/collection-items.resolver';
import { SettingsGuard } from './pages/settings/settings.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(m => m.AuthModule)},
  {
    path: 'c',
    loadChildren: () => import('./pages/collections/collections.module')
      .then(m => m.CollectionsModule),
  },
  {
    path: 'c/new',
    loadChildren: () => import('./pages/collections/collection/collection-edit/collection-edit.module')
      .then(m => m.CollectionEditModule),
  },
  {
    path: 'c/:cid',
    loadChildren: () => import('./pages/collections/collection/collection-detail/collection-detail.module')
      .then(m => m.CollectionDetailModule),
    resolve: {collection: CollectionResolver, cid: ColItemsResolver}
  },
  {
    path: 'c/:cid/edit',
    loadChildren: () => import('./pages/collections/collection/collection-edit/collection-edit.module')
      .then(m => m.CollectionEditModule),
    resolve: {collection: CollectionResolver},
  },
  {
    path: 'c/:cid/new',
    loadChildren: () => import('./pages/collections/collection-item/collection-item-edit/collection-item-edit.module')
      .then(m => m.CollectionItemEditModule),
    resolve: {collection: CollectionResolver},
  },
  {
    path: 'c/:cid/:iid',
    loadChildren: () => import('./pages/collections/collection-item/collection-item-detail/collection-item-detail.module')
      .then(m => m.CollectionItemDetailModule),
    resolve: {item: ColItemResolver},
  },
  {
    path: 'c/:cid/:iid/edit',
    loadChildren: () => import('./pages/collections/collection-item/collection-item-edit/collection-item-edit.module')
      .then(m => m.CollectionItemEditModule),
    resolve: {collection: CollectionResolver, item: ColItemResolver},
  },
  {
    path: 'p',
    loadChildren: () => import('./pages/profile/profile-page.module')
      .then(m => m.ProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module')
      .then(m => m.SettingsModule),
      canLoad: [SettingsGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module')
      .then(m => m.NotFoundModule)},
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CollectionResolver, ColItemResolver, ColItemsResolver, SettingsGuard]
})
export class AppRoutingModule { }
