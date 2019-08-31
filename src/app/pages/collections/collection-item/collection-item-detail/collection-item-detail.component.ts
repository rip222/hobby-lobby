import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/store';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';

import * as itemsSelectors from 'src/app/store/collections-store/items.selectors';
import * as authSelectors from '../../../../store/auth-store/auth.selectors';

@Component({
  selector: 'collection-item-detail',
  templateUrl: './collection-item-detail.component.html',
  styles: []
})
export class CollectionItemDetailComponent implements OnInit {
  itemId: string;
  auth$: Observable<boolean>;
  item$: Observable<ColItem>;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.params['iid'];
    this.auth$ = this.store.pipe(select(authSelectors.selectAuthenticated));
    this.item$ = this.store.pipe(select(itemsSelectors.selectItemById(this.itemId)));
  }



  addItemToUserCollection(item: ColItem) {
    const user = {
      collections: {
        TQjfWNeiNwd4c0ZRPQIL: []
      }
    };

    const collection: any = {};
    const colId = item.collectionId;
    collection[colId] = [...user.collections[colId], item];
    const newUser = {...user,
    collections: {
      ...user.collections,
      ...collection,
    }};
    console.log(newUser);
  }

}
