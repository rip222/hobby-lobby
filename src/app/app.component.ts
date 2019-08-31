import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { requestProfile } from './store/auth-store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(requestProfile());
  }
}
