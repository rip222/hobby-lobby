import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/store';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';

import * as itemsSelectors from 'src/app/store/collections-store/items.selectors';
import * as colActions from 'src/app/store/collections-store/collections.actions';
import { SeoService } from 'src/app/services/seo.service';

@Injectable()
export class ColItemResolver implements Resolve<ColItem> {
  constructor( private store: Store<AppState>, private seo: SeoService) {}
  resolve(
    route: ActivatedRouteSnapshot): Observable<any> {
    const itemId = route.params.iid;
    return this.store.pipe(
      select(itemsSelectors.selectItemById(itemId)),
      tap(item => {
        if (!item) {
          this.store.dispatch(colActions.requestCollectionItem({itemId}));
        } else {
          this.seo.generateTags(item, `/c${item.collection.id}/${item.id}`);
        }

      }),
      filter(item => !!item),
      first(),
    );
  }
}
