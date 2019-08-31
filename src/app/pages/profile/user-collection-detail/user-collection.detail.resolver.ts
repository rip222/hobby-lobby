import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { tap, filter, first, switchMap } from 'rxjs/operators';

import { AppState } from 'src/app/store';
import { selectUserCollectionById } from 'src/app/store/auth-store/auth.selectors';
import { requestCollectionItem } from 'src/app/store/collections-store/collections.actions';
import { selectItemById } from 'src/app/store/collections-store/items.selectors';
import { requestProfile } from 'src/app/store/auth-store/auth.actions';
import * as usersActons from '../../../store/users-store/users.actions';
import * as usersSelectors from '../../../store/users-store/users.selectors';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';

@Injectable()
export class UserColDetailResolver implements Resolve<ColItem[]> {
  constructor(private store: Store<AppState>) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const cid = route.params['cid'];
    const uid = route.params['uid'];
    return this.store.pipe(
      // check if there are any items in the user collection
      select(usersSelectors.selectUserCollectionById(uid, cid)),
      tap(items => {
        if (!items) {
          this.store.dispatch(usersActons.requestUser({uid}));
        }
      }),
      // if there are item ids in user collection,
      // then loop over them
      switchMap(items => {
        const colItems: Observable<ColItem>[] = [];
        items.forEach(item => {
          let obs: Observable<ColItem>;
          obs = this.store.pipe(
            // if the item is in the store, select it,
            // otherwise dispatch an action to get the item
            select(selectItemById(item)),
            tap(i => {
              if (!i) {
                this.store.dispatch(requestCollectionItem({itemId: item}));
              }
            }),
            filter(colItem => !!colItem)
          );
          // push all item observables to the array
          colItems.push(obs);

        });
        return combineLatest(colItems);
      }),
      filter(data => !!data),
      first(),
    );
  }
}
