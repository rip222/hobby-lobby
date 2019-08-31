import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as usersActions from './users.actions';
import * as usersSelectors from './users.selectors';
import * as authActions from '../auth-store/auth.actions';

import { UsersService } from 'src/app/services/users.service';
import { AppState } from '..';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: UsersService,
  ) {}

  requestUser$ = createEffect(() => this.actions$.pipe(
   ofType(usersActions.requestUser),
   switchMap(action => this.db.getUserById(action.uid)),
   map((user: User) => usersActions.addUser({user}))
  ), );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(usersActions.updateUser),
    switchMap(action => this.db.updateUser(action.user)
              // .then(_ => authActions.updateProfile({user: action.user}))
              ),
    catchError(error => of(error)),
  ), {dispatch: false});
}
