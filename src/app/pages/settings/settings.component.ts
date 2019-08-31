import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';

import * as usersActions from '../../store/users-store/users.actions';
import * as authActions from '../../store/auth-store/auth.actions';
import * as authSelectors from '../../store/auth-store/auth.selectors';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent {
  profile$: Observable<User>;
  newLogin = '';
  newEmail = '';
  newPassword = '';
  constructor(private store: Store<AppState>) {
    this.profile$ = store.pipe(select(authSelectors.selectUser));
  }

  updateLogin(user: User) {
    const updUser: User = {...user, name: this.newLogin};
    this.store.dispatch(authActions.changeName({name: this.newLogin}));
    this.store.dispatch(usersActions.updateUser({user: updUser}));
    this.newLogin = '';
  }

  updateEmail(user: User) {
    const updUser: User = {...user, email: this.newEmail};
    this.store.dispatch(authActions.changeEmail({email: this.newEmail}));
    this.store.dispatch(usersActions.updateUser({user: updUser}));
    this.newEmail = '';
  }

  updatePassword() {
    this.store.dispatch(authActions.changePassword({password: this.newPassword}));
    this.newPassword = '';
  }
}
