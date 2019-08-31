import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AppState } from 'src/app/store';
import { selectCollectionById } from '../../../store/collections-store/collections.selectors';
import { requestCollection } from '../../../store/collections-store/collections.actions';
import { Collection } from 'src/app/shared/models/collection.model';
import { selectUserCollectionById } from 'src/app/store/auth-store/auth.selectors';
import * as userSelectors from '../../../store/users-store/users.selectors';

@Component({
  selector: 'collections-block',
  templateUrl: './collections-block.component.html',
  styles: []
})
export class CollectionsBlockComponent implements OnInit {
  @Input() detail: any;
  @Input() uid: string;
  collections$: Observable<Collection[]>;
  userCollectionItems$: Observable<string[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    if (this.detail.collections) {
      const cols: Observable<Collection>[] = [];
      let colObs: Observable<Collection>;
      for (const colId in this.detail.collections) {
        colObs = this.store.pipe(
          select(selectCollectionById(colId)),
          tap(col => {
            if (!col) {
              this.store.dispatch(requestCollection({collectionId: colId}));
            }
          }),
        );
        cols.push(colObs);
      }
      this.collections$ = combineLatest(cols);
    }
  }


  getUserCollectionItemsLength(colId: string): Observable<number> {
    return this.store.pipe(
      select(userSelectors.selectUserCollectionById(this.uid, colId)),
      map(items => items.length)
    );
  }



}
