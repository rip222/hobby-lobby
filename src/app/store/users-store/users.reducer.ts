import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/shared/models/user.model';
import { createReducer, on, Action } from '@ngrx/store';

import * as userActions from './users.actions';

export interface UsersState extends EntityState<User> {
}

export const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

const reducer = createReducer(initialState,
  on(userActions.addUser, (state, action) => usersAdapter.addOne(action.user, state)),
  on(userActions.updateUser, (state, action) => usersAdapter.upsertOne(action.user, state)),
);

export function usersReducer(state: UsersState, action: Action) {
  return reducer(state, action);
}
