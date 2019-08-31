import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import { AppState } from 'src/app/store';
import { selectCollectionItemsLoaded } from 'src/app/store/collections-store/collections.selectors';
import { requestCollectionItems } from 'src/app/store/collections-store/collections.actions';

@Injectable()
export class ColItemsResolver implements Resolve<string> {
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<string> {
    const cid = route.params.cid;
    return this.store.pipe(
      select(selectCollectionItemsLoaded(cid)),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(requestCollectionItems({colId: cid}));
        }
      }),
      filter(loaded => !!loaded),
      first(),
    );
  }
}
