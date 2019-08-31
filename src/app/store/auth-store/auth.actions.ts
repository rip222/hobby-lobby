import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { ColItem } from '../../shared/models/collection-item-models/col-item.model';

export const requestAuthentication = createAction('[Auth] Request Authentication');
export const loginUser = createAction('[Auth] Login User', props<{authenticated: boolean}>());
export const logoutUser = createAction('[Auth] Logout User');
export const loginSuccess = createAction('[Auth] Login Success');

export const requestProfile = createAction('[Auth] Request Profile');
export const loadProfile = createAction('[Auth] Load Profile', props<{user: User}>());
export const updateProfile = createAction('[Auth] Update Profile', props<{user: User}>());

export const changeName = createAction('[Auth API] Change Name', props<{name: string}>());
export const changeEmail = createAction('[Auth API] Change Email', props<{email: string}>());
export const changePassword = createAction('[Auth API] Change Password', props<{password: string}>());

export const addItemToUserCollection =
  createAction('[User] Add Item to User Collection', props<{user: User, item: ColItem}>());
export const removeItemFromUserCollection =
  createAction('[User], Remove Item From User Collection', props<{item: ColItem}>());
