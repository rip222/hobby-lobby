import { createAction, props } from '@ngrx/store';
import { Collection } from 'src/app/shared/models/collection.model';
import { ColItem } from 'src/app/shared/models/collection-item-models/col-item.model';

// Collection actions
export const requestCollections = createAction('[Collections] Request Collections');
export const getCollections = createAction('[Collections] Get Collections', props<{collections: Collection[]}>());
export const requestCollection = createAction('[Collections] Request Collection', props<{collectionId: string}>());
export const addSearchResultsToCollections = createAction('[Collections API] Add Search Results To Collections',
  props<{collections: Collection[]}>());

export const loadCollection = createAction('[Collections API] Get Collection', props<{collection: Collection}>());
export const updateCollection = createAction('[Colllections API] Update Collection', props<{collection: Collection}>());
export const addCollection = createAction('[Collections API] Add Collection', props<{collection: Collection}>());
export const deleteCollection = createAction('[Collections API] Delete Collection', props<{id: string}>());

export const updateLoadedCollectionItems = createAction('[Collections] Update Loaded ColItems', props<{colId: string}>());

// look for the keyword in store
export const lookForKeyword = createAction('[Collections] Look For Keyword', props<{keyword: string}>());
// look for the keyword on the server
export const searchForKeyword = createAction('[Collections] Search For Keyword', props<{keyword: string}>());
// add the keyword to the store
export const addSearchKeyword = createAction('[Collections] Add Search Keyword', props<{keyword: string}>());

// Collection items actions
export const requestCollectionItems = createAction('[Collection Items] Request Collection Items', props<{colId: string}>());
export const requestCollectionItem = createAction('[Collection Items] Request Collection Item', props<{itemId: string}>());
export const getCollectionItems = createAction('[Collection Items] Get Collection Items', props<{items: ColItem[]}>());

export const loadCollectionItems = createAction('[Collection Items API] Load Collection Items', props<{items: ColItem[]}>());
export const loadCollectionItem = createAction('[Collection Items API] Load Collection Item', props<{item: ColItem}>());
export const updateCollectionItem = createAction('[Collection Items API] Update Collection Item', props<{item: ColItem}>());
export const addCollectionItem = createAction('[Collection Item API], Add Collection Item', props<{item: ColItem}>());
export const deleteCollectionItem = createAction('[Collection Item API] Delete Collection Item', props<{itemId: string}>());

export const updateCollectionOnItemAdded = createAction('[Collections API] Add Item, Update Collection',
  props<{item: ColItem, collection: Collection}>());
