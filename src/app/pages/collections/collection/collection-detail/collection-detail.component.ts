import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

import { AlertsService } from 'src/app/services/alerts.service';

import { AppState } from 'src/app/store';
import { Collection } from 'src/app/shared/models/collection.model';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';
import { User } from 'src/app/shared/models/user.model';

import * as colSelectors from 'src/app/store/collections-store/collections.selectors';
import * as itemsSelectors from 'src/app/store/collections-store/items.selectors';
import * as authSelectors from 'src/app/store/auth-store/auth.selectors';
import * as usersActions from '../../../../store/users-store/users.actions';

@Component({
  selector: 'collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.sass'],
})
export class CollectionDetailComponent implements OnInit, OnDestroy {
  auth$: Observable<boolean>;
  isSelectMode = false;
  userSubscription: Subscription;
  user: User;
  collection$: Observable<Collection>;
  items$: Observable<any[]>;
  selectedItems: any[] = [];
  id: string;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private alerts: AlertsService,
  ) { }

  onSelectMode() {
    this.isSelectMode = !this.isSelectMode;
  }

  isSelected(item: ColItem) {
    return this.selectedItems.find(id => id === item.id);
  }

  notify() {
    this.alerts.alert('Click on items to add them to your collection');
  }

  ngOnInit() {
    this.auth$ = this.store.pipe(select(authSelectors.selectAuthenticated));

    this.id = this.route.snapshot.params.cid;
    this.userSubscription = this.store.pipe(
      select(authSelectors.selectUser),
      skipWhile(user => user === null || user === undefined),
      ).subscribe(data => {
        this.user = data;
        if (data.collections[this.id]) {
          this.selectedItems = [...data.collections[this.id]];
        }
      });
    this.collection$ = this.store.pipe(select(colSelectors.selectCollectionById(this.id)));
    this.items$ = this.store.pipe(select(itemsSelectors.selectItemsByCollectionId(this.id)));  }


    addItemsToList(item: ColItem) {
      if (!this.selectedItems.find(itemId => item.id === itemId)) {
        this.selectedItems = [...this.selectedItems, item.id];
      } else {
        this.selectedItems = [...this.selectedItems.filter(itemId => itemId !== item.id)];
      }
      return this.selectedItems;
    }

    updateCollection() {
      const updCollection: any = {};
      updCollection[this.id] = this.selectedItems;
      const user: User = {
        ...this.user,
        collections: {
          ...this.user.collections,
          ...updCollection
        }
      };
      this.store.dispatch(usersActions.updateUser({user}));
      this.selectedItems = updCollection[this.id];
      this.isSelectMode = false;
      this.alerts.alert('Your collection has been updated!');
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }
  }
