import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Collection } from '../../shared/models/collection.model';
import { AppState } from '../../store';

import * as colActions from '../../store/collections-store/collections.actions';
import * as colSelectors from '../../store/collections-store/collections.selectors';
import * as authSelectors from '../../store/auth-store/auth.selectors';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent implements OnInit {
  collections$: Observable<Collection[]>;
  auth$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.updateTitle('Collections');
    this.auth$ = this.store.pipe(select(authSelectors.selectAuthenticated));
    this.store.dispatch(colActions.requestCollections());
    this.collections$ = this.store.pipe(select(colSelectors.selectAllCollections));
  }

  addCollection() {this.router.navigate(['/c/new']); }

}
