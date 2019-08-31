import { createSelector, createFeatureSelector } from '@ngrx/store';
import { collectionAdapter, CollectionsState, DataState } from './collections.reducer';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = collectionAdapter.getSelectors();

export const selectDataState = createFeatureSelector<DataState>('data');
export const selectCollectionsState = createSelector(selectDataState, state => state.collections);
export const selectAllCollectionsLoaded = createSelector(selectCollectionsState, state => state.allCollectionsLoaded);
export const selectSearchKeywords = createSelector(selectCollectionsState, state => state.searchKeywords);

export const selectSearchKeyword = (keyword: string) => createSelector(
  selectSearchKeywords, keywords => keywords.find(item => item === keyword));

export const selectCollectionItemsLoaded = (colId: string) => createSelector(
  selectCollectionsState, state => state.collectionItemsLoaded.find(item => item === colId));

export const selectAllCollections = createSelector(selectCollectionsState, selectAll);
export const selectCollectionEntities = selectEntities;
export const selectCollectionIds = selectIds;
export const selectCollectionsTotal = selectTotal;

export const selectCollectionById = (collectionId: string) => createSelector(
  selectCollectionsState, state => state.entities[collectionId]
);

export const selectCollectionsByKeyword = (keyword: string) => createSelector(
  selectAllCollections, collections => {
    return collections.filter(collection => collection.title.toUpperCase().includes(keyword.toUpperCase()) );
  }
);
