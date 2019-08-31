import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { of, noop } from 'rxjs';

import * as authActions from './auth.actions';
import { AppState } from '..';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private auth: AuthService,
    private router: Router,
    private alerts: AlertsService) {}

  loggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.requestAuthentication),
    switchMap(action => {
      this.auth.checkAuthState();
      return this.auth.loggedIn;
    }),
    tap(data => this.store.dispatch(authActions.loginUser({authenticated: data}))),
    map(auth => {
      if (auth === true) {
        return this.store.dispatch(authActions.loginSuccess());
      }
    })
  ), {dispatch: false});

  loggedOut$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logoutUser),
    tap(action => {
      this.auth.logout();
      this.router.navigate(['/']);
    })
  ));

  requestProfile$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.requestProfile),
    switchMap(action => this.auth.userData),
    map(user => this.store.dispatch(authActions.loadProfile({user})))
  ), {dispatch: false});

  updateUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.updateProfile),
    switchMap(action => this.auth.updateUserInDataBase(action.user)),
    catchError(error => of(error)),
  ), {dispatch: false}
  );

  changeName$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.changeName),
    switchMap(action => {
      if (action.name.length < 3 ) {
        this.alerts.alert('Login must be 3 characters or more');
        return of(null);
      } else {
        return this.auth.changeUserName(action.name)
          .then(_ => this.alerts.alert('Login updated'))
          .catch(error => this.alerts.alert('Something went wrong. Try again'));
      }
    })
  ), {dispatch: false}
  );

  changeEmail$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.changeEmail),
    switchMap(action => {
      return this.auth.changeEmail(action.email)
        .then(_ => this.alerts.alert('Email updated'))
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            this.alerts.alert(error.message);
          } else {
            this.alerts.alert(error.message);
          }
        });
    })
  ), {dispatch: false}
  );

  changePassword$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.changePassword),
    switchMap(action => {
      return this.auth.changePassword(action.password)
        .then(_ => this.alerts.alert('Password updated'))
        .catch(error => {
          if (error.code === 'auth/weak-password') {
            this.alerts.alert(error.message);
          } else {
            this.alerts.alert(error.message);
          }
        });
    })
  ), {dispatch: false}
  );
}
