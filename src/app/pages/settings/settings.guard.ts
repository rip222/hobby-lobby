import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/store';

import * as authSelectors from '../../store/auth-store/auth.selectors';
import * as authActions from '../../store/auth-store/auth.actions';
import { SeoService } from 'src/app/services/seo.service';

@Injectable()
export class SettingsGuard implements CanLoad {
  constructor(private store: Store<AppState>, private seo: SeoService) {}
  canLoad(): Observable<boolean> {
    return this.store.pipe(
      select(authSelectors.selectAuthenticated),
      tap(auth => {
        if (!auth) {
          this.store.dispatch(authActions.requestProfile())
        } else {
          this.seo.updateTitle('Settings');
        }
      }),
      filter(auth => !!auth),
      take(1)
    )
  }
}
