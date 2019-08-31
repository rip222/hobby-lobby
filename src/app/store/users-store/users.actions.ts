import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const requestUser = createAction('[Users] Request User', props<{uid: string}>());
export const getUser = createAction('[Users API] Get User', props<{uid: string}>());
export const addUser = createAction('[Users] Add User', props<{user: User}>());
export const updateUser = createAction('[Users API] Update User', props<{user: User}>());
