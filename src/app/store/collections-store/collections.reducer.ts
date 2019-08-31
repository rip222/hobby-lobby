import { createReducer, on, Action, ActionReducerMap } from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Collection } from '../../../app/shared/models/collection.model';
import {
  getCollections,
  loadCollection,
  updateCollection,
  addCollection,
  deleteCollection,
  getCollectionItems,
  loadCollectionItem,
  updateCollectionItem,
  addCollectionItem,
  deleteCollectionItem,
  loadCollectionItems,
  updateLoadedCollectionItems,
  addSearchKeyword,
  addSearchResultsToCollections} from './collections.actions';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';


export interface CollectionsState extends EntityState<Collection> {
  allCollectionsLoaded: boolean;
  collectionItemsLoaded: string[];
  searchKeywords: string[];
}
export interface CollectionsItemsState extends EntityState<ColItem> {

}

export const collectionAdapter: EntityAdapter<Collection> = createEntityAdapter<Collection>();
export const itemsAdapter: EntityAdapter<ColItem> = createEntityAdapter<ColItem>();

const collectionsInitialState = collectionAdapter.getInitialState({
  allCollectionsLoaded: false,
  collectionItemsLoaded: [],
  searchKeywords: []
});

const itemsInitialState = itemsAdapter.getInitialState();

const colReducer = createReducer(collectionsInitialState,
  on(getCollections, (state, action) => collectionAdapter.upsertMany(action.collections, {...state, allCollectionsLoaded: true})),
  on(addSearchResultsToCollections, (state, action) => collectionAdapter.upsertMany(action.collections, state)),
  on(loadCollection, (state, action) => collectionAdapter.addOne(action.collection, state)),
  on(updateCollection, (state, action) => collectionAdapter.upsertOne(action.collection, state)),
  on(addCollection, (state, action) => collectionAdapter.addOne(action.collection, state)),
  on(deleteCollection, (state, action) => collectionAdapter.removeOne(action.id, state)),

  on(updateLoadedCollectionItems, (state, action) => ({
    ...state, collectionItemsLoaded: [...state.collectionItemsLoaded, action.colId]})),

  on(addSearchKeyword, (state, action) => ({
    ...state, searchKeywords: [...state.searchKeywords, action.keyword]})),

);

export function collectionsReducer(state: CollectionsState, action: Action) {
  return colReducer(state, action);
}


const itReducer = createReducer(itemsInitialState,
  on(getCollectionItems, (state, action) => itemsAdapter.addAll(action.items, state)),
  on(loadCollectionItems, (state, action) => itemsAdapter.upsertMany(action.items, state)),
  on(loadCollectionItem, (state, action) => itemsAdapter.addOne(action.item, state)),
  on(updateCollectionItem, (state, action) => itemsAdapter.upsertOne(action.item, state)),
  on(addCollectionItem, (state, action) => itemsAdapter.addOne(action.item, state)),
  on(deleteCollectionItem, (state, action) => itemsAdapter.removeOne(action.itemId, state)),
  );

export function itemsReducer(state: CollectionsItemsState, action: Action) {
  return itReducer(state, action);
}



export interface DataState {
  collections: CollectionsState;
  items: CollectionsItemsState;
}

export const reducers: ActionReducerMap<DataState> = {
  collections: collectionsReducer,
  items: itemsReducer
};
