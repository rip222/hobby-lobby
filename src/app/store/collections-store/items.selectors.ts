import { itemsAdapter, CollectionsItemsState } from './collections.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectDataState } from './collections.selectors';

const {selectAll, selectEntities, selectIds, selectTotal} = itemsAdapter.getSelectors();

export const selectItemsState = createSelector(selectDataState, state => state.items);

export const selectAllItems = createSelector(selectItemsState, selectAll);
export const selectItemsEntities = createSelector(selectItemsState, selectEntities);
export const selectItemsIds = createSelector(selectItemsState, selectIds);
export const selectItemsTotal = createSelector(selectItemsState, selectTotal);

export const selectItemById = (itemId: string) => createSelector(
  selectItemsState, state => state.entities[itemId]
);

export const selectItemsByCollectionId = (cid: string) => createSelector(
  selectItemsEntities, ent => {
    const entities = Object.values(ent);
    const filteredItems = entities.filter(item => item.collection.id === cid);
    return filteredItems;
  }
);