import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../store';
import * as userSelectors from '../../store/users-store/users.selectors';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {
  uid: string;
  profile$: Observable<any>;
  detail$: Observable<any>;
  collections$: Observable<any>;
  toggleCollections = false;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private alerts: AlertsService) { }

  tempAlert() {
    this.alerts.alert('TBD');
  }

  ngOnInit() {
    this.uid = this.route.snapshot.params.uid;

    this.profile$ = this.store.pipe(
      select(userSelectors.selectUserById(this.uid)),
      map(user => {
        if (user) {
          return {
            ...user,
            collections: Object.keys(user.collections).length,
            achievements: Object.keys(user.achievements).length
          };
        }
      })
    );
  }

  selectDisplayBlock(detail: string) {
    switch (detail) {
      case 'collections': return this.detail$ = this.store.pipe(
        select(userSelectors.selectUserCollections(this.uid)),
        map(cols => {
          return {collections: cols};
        })
      );
      case 'achievements': return this.detail$ = this.store.pipe(
        select(userSelectors.selectUserAchievements(this.uid)),
        map(a => {
          return {achievements: a};
        })
      );
    }
  }

}
