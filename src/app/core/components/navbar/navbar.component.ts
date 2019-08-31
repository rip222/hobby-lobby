import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';

import { AuthService } from '../../../services/auth.service';

import { AppState } from '../../../store';
import { User } from '../../../shared/models/user.model';
import { requestAuthentication } from '../../../store/auth-store/auth.actions';
import { selectAuthenticated, selectUser } from '../../../store/auth-store/auth.selectors';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  isAuth: Observable<boolean>;
  profile$: Observable<User>;
  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(requestAuthentication());
    this.isAuth = this.store.pipe(select(selectAuthenticated));
    this.profile$ = this.store.pipe(select(selectUser));
  }

  logout() {
    this.auth.logout()
      .then(_ => this.router.navigateByUrl('/'));
  }

}
