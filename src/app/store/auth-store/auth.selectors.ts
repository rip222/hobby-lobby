import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthenticated = createSelector(selectAuthState, state => state.loggedIn);
export const selectLoginSuccess = createSelector(selectAuthState, state => state.loginSuccess);

export const selectUser = createSelector(selectAuthState, state => state.user);

export const selectUserCollections = createSelector(selectUser, user => user ? user.collections : {});
export const selectUserAchievements = createSelector(selectUser, user => user ? user.achievements: {});
export const selectUserExperience = createSelector(selectUser, user => user.experience);

export const selectUserCollectionById = (colId: string) => createSelector(
  selectUserCollections, collections => collections[colId] ? collections[colId] : [])