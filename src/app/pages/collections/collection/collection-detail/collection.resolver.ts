import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import { SeoService } from 'src/app/services/seo.service';

import { Collection } from 'src/app/shared/models/collection.model';
import { AppState } from 'src/app/store';

import { selectCollectionById } from 'src/app/store/collections-store/collections.selectors';
import { requestCollection } from 'src/app/store/collections-store/collections.actions';

@Injectable()
export class CollectionResolver implements Resolve<Collection> {

  constructor(private store: Store<AppState>, private seo: SeoService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Collection> {
    const cid = route.params.cid;

    return this.store.pipe(
      select(selectCollectionById(cid)),
      tap(collection => {
        if (!collection) {
          this.store.dispatch(requestCollection({collectionId: cid}));
        } else {
          this.seo.generateTags(collection, `c/${collection.id}`);
        }
      }),
      filter(collection => !!collection),
      first(),
    );
  }
}
