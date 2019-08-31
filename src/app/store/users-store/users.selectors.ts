import { usersAdapter, UsersState } from './users.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = usersAdapter.getSelectors();

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(selectUsersState, selectAll);
export const selectUsersEntities = createSelector(selectUsersState, selectEntities);
export const selectUserById = (uid: string) => createSelector(selectUsersEntities, entities => entities[uid]);
export const selectUserCollections = (uid: string) => createSelector(selectUserById(uid), user => user ? user.collections : {});
export const selectUserAchievements = (uid: string) => createSelector(selectUserById(uid), user => user ? user.achievements : {});
export const selectUserExperience = (uid: string) => createSelector(selectUserById(uid), user => user ? user.experience : null);

export const selectUserCollectionById = (uid: string, cid: string) => createSelector(
  selectUserCollections(uid), collections => collections[cid] ? collections[cid] : []);
