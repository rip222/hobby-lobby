import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Collection } from '../shared/models/collection.model';
import { map, catchError } from 'rxjs/operators';
import { ColItem } from '../shared/models/collection-item-models/col-item.model';
import { of } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
  )
export class CollectionsService {
  collections: AngularFirestoreCollection<Collection> = this.firestore.collection('collections');
  items: AngularFirestoreCollection<ColItem> = this.firestore.collection('items');
  constructor(private firestore: AngularFirestore) { }

  getCollections() {
    return this.collections.valueChanges({idField: 'id'});
  }

  getCollectionsByTitle(keyword: string) {
    return this.firestore.collection<Collection>('collections',
      ref => ref.where('title', '>=', keyword)).valueChanges({idField: 'id'});
  }

  getCollection(id: string) {
    const colRef = this.collections.doc(id);
    return colRef.get().pipe(
      map(col => {
        return {...col.data(), id: col.id};
      }),
      catchError(error => error)
    );
  }

  addCollection(collection: Collection) {
    return this.collections.doc(collection.id).set(collection)
      .catch(error => error);
  }

  updateCollection(collection: Collection) {
    return this.collections.doc(collection.id).update(collection)
      .catch(error => error);
  }

  deleteCollection(collection: Collection) {
    return this.collections.doc(collection.id).delete()
      .catch(error => error);
  }

  getCollectionItem(id: string) {
    const itemRef = this.items.doc(id);
    return itemRef.get().pipe(
      map(item => {
        return {...item.data(), id: item.id};
      }),
      catchError(error => of(error))
    );
  }

  getCollectionItems(id: string) {
    return this.firestore.collection('items', ref => ref.where('collection.id', '==', id))
      .valueChanges({idField: 'id'});
  }

  addItem(item: ColItem, collection: Collection) {
    return this.items.doc(item.id).set(item)
      .then(_ => this.updateCollection(collection))
      .catch(error => error);
  }

  updateItem(item: ColItem) {
    return this.items.doc(item.id).set(item)
      .catch(error => error);
  }

  deleteItem(item: ColItem) {
    return this.items.doc(item.id).delete()
      .catch(error => error);
  }

}
