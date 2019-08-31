import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from './auth.actions';
import { User } from 'src/app/shared/models/user.model';

export interface AuthState {
  loggedIn: boolean;
  loginSuccess: boolean;
  user: User;
}

const initialState: AuthState = {loggedIn: false, loginSuccess: false, user: null};

const reducer = createReducer(initialState,
  on(authActions.loginUser, (state, action) => ({...state, loggedIn: action.authenticated})),
  on(authActions.loginSuccess, (state, action) => ({...state, loginSuccess: true})),
  on(authActions.loadProfile, (state, action) => ({...state, user: action.user})),
  on(authActions.updateProfile, (state, action) => ({...state, user: action.user})),
  on(authActions.changeName, (state, action) => ({...state, user: {...state.user, name: action.name}})),
  on(authActions.changeEmail, (state, action) => ({...state, user: {...state.user, email: action.email}}))
);

export function authReducer(state: AuthState | null, action: Action) {
  return reducer(state, action);
}
