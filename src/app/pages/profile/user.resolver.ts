import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';
import { AppState } from '../../store';
import { selectUserById } from '../../store/users-store/users.selectors';
import { requestUser } from '../../store/users-store/users.actions';
import { SeoService } from 'src/app/services/seo.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private store: Store<AppState>, private seo: SeoService) {}
  resolve(
    route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.params.uid;
    return this.store.pipe(
      select(selectUserById(id)),
      tap((user: User) => {
        if (!user) {
          this.store.dispatch(requestUser({uid: id}));
        } else {
          this.seo.updateTitle(`${user.name}'s Profile`);
        }
      }),
      filter(user => !!user),
      first()
    );
  }
}
