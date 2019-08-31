import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Collection } from 'src/app/shared/models/collection.model';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';
import { map, switchMap, tap } from 'rxjs/operators';

import * as usersSelectors from '../../../store/users-store/users.selectors';
import * as usersActions from '../../../store/users-store/users.actions';
import * as authSelectors from '../../../store/auth-store/auth.selectors';
import { User } from 'src/app/shared/models/user.model';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'user-collection-detail',
  templateUrl: './user-collection-detail.component.html',
  styles: []
})
export class UserCollectionDetailComponent implements OnInit, OnDestroy {
  cid: string;
  // uid: string;
  profileSub: Subscription;
  userSub: Subscription;
  user: User;
  profile: User;
  collection$: Observable<Collection>;
  items$: Observable<ColItem[]>;
  liked = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private seo: SeoService
    ) {
    this.cid = route.snapshot.params.cid;

    this.collection$ = route.data.pipe(map(data => data['collection']));
    this.items$ = route.data.pipe(map(data => data['items']));
  }

  ngOnInit() {
    const uid = this.route.snapshot.params.uid;
    this.profileSub = this.store.pipe(select(authSelectors.selectUser))
    .subscribe(profile => this.profile = profile);
    this.userSub = this.store.pipe(
      select(usersSelectors.selectUserById(uid)),
      tap(user => {
        if (!user) {
          this.store.dispatch(usersActions.requestUser({uid}));
        }
      }),
    ).subscribe(user => {
      this.user = user;
      if (user.colLikes[this.cid]) {
        this.liked = !!this.user.colLikes[this.cid].find(id => id === this.profile.id);
      }
    });
    const col = this.route.snapshot.data['collection'];
    this.seo.generateTags(col, `/p/${this.user.id}/c/${col.id}`);
    this.seo.updateTitle(`${this.user.name}'s ${col.title} Collection`);
  }

  onLike() {
    const colLike: any = {};
    if (!this.user.colLikes[this.cid]) {
      colLike[this.cid] = [this.profile.id];
      this.liked = true;
    } else {
      if (this.liked) {
        colLike[this.cid] = [...this.user.colLikes[this.cid].filter(id => id !== this.profile.id)];
        this.liked = false;
      } else {
        colLike[this.cid] = [...this.user.colLikes[this.cid], this.profile.id];
        this.liked = true;
      }
    }
    const user: User = {
      ...this.user,
      colLikes: {
        ...this.user.colLikes,
        ...colLike
      }
    };
    this.store.dispatch(usersActions.updateUser({user}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.profileSub.unsubscribe();
  }

}
