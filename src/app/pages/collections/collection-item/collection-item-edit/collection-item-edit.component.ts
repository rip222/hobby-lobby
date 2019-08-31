import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';


import { AppState } from 'src/app/store';
import { Collection } from 'src/app/shared/models/collection.model';
import { User } from 'src/app/shared/models/user.model';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';

import * as colActions from '../../../../store/collections-store/collections.actions';
import * as colSelectors from 'src/app/store/collections-store/collections.selectors';
import * as itemsSelectors from 'src/app/store/collections-store/items.selectors';
import * as authActions from '../../../../store/auth-store/auth.actions';
import * as authSelectors from 'src/app/store/auth-store/auth.selectors';


@Component({
  selector: 'collection-item-edit',
  templateUrl: './collection-item-edit.component.html',
  styleUrls: ['./collection-item-edit.component.sass'],
})
export class CollectionItemEditComponent implements OnInit {
  cid: string;
  iid: string;

  collection$: Observable<Collection>;
  item$: Observable<ColItem>;
  profile$: Observable<User>;
  data$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
   ) { }

  ngOnInit() {
    this.cid = this.route.snapshot.params.cid;
    this.iid = this.route.snapshot.params.iid;

    this.collection$ = this.store.pipe(select(colSelectors.selectCollectionById(this.cid)));
    this.item$ = this.store.pipe(select(itemsSelectors.selectItemById(this.iid)));
    this.profile$ = this.store.pipe(select(authSelectors.selectUser));

    this.data$ = this.profile$.pipe(
      withLatestFrom(this.collection$, this.item$),
      map(data => {
        return [data[0], data[1], data[2] ? data[2] : null];
      })
    );
  }

  updateItem(event: {user: User, item: ColItem}) {
    this.store.dispatch(authActions.updateProfile({user: event.user}));
    this.store.dispatch(colActions.updateCollectionItem({item: event.item}));
  }

  createItem(event: {user: User, item: ColItem, collection: Collection}) {
    this.store.dispatch(authActions.updateProfile({user: event.user}));
    this.store.dispatch(colActions.updateCollectionOnItemAdded({item: event.item, collection: event.collection}));
  }
}
