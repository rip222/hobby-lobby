import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppState } from 'src/app/store';

import { Collection } from 'src/app/shared/models/collection.model';
import { selectCollectionsByKeyword } from 'src/app/store/collections-store/collections.selectors';
import { lookForKeyword } from 'src/app/store/collections-store/collections.actions';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  listHidden = false;
  collections$: Observable<Collection[]>;
  constructor(private store: Store<AppState>, private router: Router) { }

  search(keyword: string) {
    this.store.dispatch(lookForKeyword({keyword}));
    this.collections$ = this.store.pipe(select(selectCollectionsByKeyword(keyword)));
  }

  hideList() {
    this.collections$ = null;
  }

  navigateToLink(colId: string) {
    this.router.navigate(['c', colId]);
  }

}
