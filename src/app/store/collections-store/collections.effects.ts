import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, withLatestFrom, filter, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CollectionsService } from 'src/app/services/collections.service';

import {
  requestCollections,
  getCollections,
  requestCollection,
  loadCollection,
  addCollection,
  updateCollection,
  requestCollectionItems,
  loadCollectionItems,
  updateLoadedCollectionItems,
  requestCollectionItem,
  loadCollectionItem,
  addCollectionItem,
  updateCollectionOnItemAdded,
  updateCollectionItem,
  searchForKeyword,
  addSearchKeyword,
  lookForKeyword,
  addSearchResultsToCollections
} from './collections.actions';
import { AppState } from '..';
import { selectAllCollectionsLoaded, selectSearchKeyword } from './collections.selectors';
import { Collection } from 'src/app/shared/models/collection.model';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';
import { AlertsService } from 'src/app/services/alerts.service';

@Injectable()
export class CollectionsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: CollectionsService,
    private router: Router,
    private alerts: AlertsService,
  ) {}

  getCollections$ = createEffect(() => this.actions$.pipe(
    ofType(requestCollections),
    withLatestFrom(this.store.pipe(select(selectAllCollectionsLoaded))),
    filter(([action, allCollectionsLoaded]) => !allCollectionsLoaded),
    mergeMap(() => this.db.getCollections()),
    map(collections => this.store.dispatch(getCollections({collections}))),
    catchError(error => of(error)),
    ), {dispatch: false}
  );

  lookForKeyword$ = createEffect(() => this.actions$.pipe(
    ofType(lookForKeyword),
    switchMap(action => this.store.pipe(
      select(selectSearchKeyword(action.keyword)),
      tap(keyword => {
        if (!keyword) {
          this.store.dispatch(searchForKeyword({keyword: action.keyword}));
        }
      }),
    )),
  ), {dispatch: false});

  searchForCollections$ = createEffect(() => this.actions$.pipe(
    ofType(searchForKeyword),
    switchMap(action => this.db.getCollectionsByTitle(action.keyword).pipe(
      tap(_ => this.store.dispatch(addSearchKeyword({keyword: action.keyword}))),
    )),
    map(collections => {
      if (collections.length > 0) {
        this.alerts.alert(`${collections.length} results found!`);
        return this.store.dispatch(addSearchResultsToCollections({collections}));
      } else {
        this.alerts.alert('Nothing found...');
        return of(null);
      }
    }),
    catchError(error => of(error)),
  ), {dispatch: false});

  getCollection$ = createEffect(() => this.actions$.pipe(
    ofType(requestCollection),
    mergeMap(action => this.db.getCollection(action.collectionId)),
    map((collection: Collection) => loadCollection({collection})),
    catchError(error => of(error))
    )
  );

  addCollection$ = createEffect(() => this.actions$.pipe(
    ofType(addCollection),
    mergeMap(action => this.db.addCollection(action.collection)
      .then(_ => {
        this.router.navigate(['/c', action.collection.id]);
        this.alerts.alert(`${action.collection.title} added!`);
      })
      .catch(error => this.alerts.alert('Something went wrong...'))
    ),
    catchError(error => of(this.alerts.alert('Something went wrong...'))),
  ), {dispatch: false} );

  updateCollection$ = createEffect(() => this.actions$.pipe(
    ofType(updateCollection),
    mergeMap(action => this.db.updateCollection(action.collection)
      .then(_ => {
        this.router.navigate(['/c', action.collection.id]);
        this.alerts.alert(`${action.collection.title} updated!`);
      })),
    catchError(error => of(this.alerts.alert('Something went wrong...'))),
  ), {dispatch: false});

  getCollectionItems$ = createEffect(() => this.actions$.pipe(
    ofType(requestCollectionItems),
    mergeMap(action => this.db.getCollectionItems(action.colId).pipe(
      // used nested pipe to have access to the collection id via action.colId
      tap((items: ColItem[]) => {
        if (items.length === 0) {
          this.store.dispatch(updateLoadedCollectionItems({colId: action.colId}));
        } else {
          this.store.dispatch(updateLoadedCollectionItems({colId: action.colId}));
          this.store.dispatch(loadCollectionItems({items}));
        }
      })
    )),
    catchError(error => of(error)),
  ), {dispatch: false});

  getCollectionItem$ = createEffect(() => this.actions$.pipe(
    ofType(requestCollectionItem),
    mergeMap(action => this.db.getCollectionItem(action.itemId)),
    map((item: ColItem) => loadCollectionItem({item})),
    catchError(error => of(error))
  ));

  addCollectionItem$ = createEffect(() => this.actions$.pipe(
    ofType(updateCollectionOnItemAdded),
    mergeMap(action => {
      return this.db.addItem(action.item, action.collection)
        .then(_ => {
          this.router.navigate(['/c', action.collection.id, action.item.id]);
          this.alerts.alert(`${action.item.title} added to ${action.collection.title} collection!`);
          return [
            this.store.dispatch(addCollectionItem({item: action.item})),
            this.store.dispatch(updateCollection({collection: action.collection}))
          ];
        });
    }),
    catchError(error => of(this.alerts.alert('Something went wrong...'))),

  ), {dispatch: false});

  updateCollectionItem$ = createEffect(() => this.actions$.pipe(
    ofType(updateCollectionItem),
    mergeMap(action => {
      return this.db.updateItem(action.item)
        .then(_ => {
          this.router.navigate(['c', action.item.collection.id, action.item.id]);
          this.alerts.alert(`${action.item.title} updated!`);
        });
    }),
    catchError(error => of(this.alerts.alert('Something went wrong...')))
  ), {dispatch: false});
}
