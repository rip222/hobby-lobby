import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../shared/models/user.model';

@Injectable({providedIn: 'root'})
export class UsersService {

  users: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.users = this.db.collection('users');
  }

  getUserById(id: string) {
    return this.users.doc(id).valueChanges().pipe(
      catchError(error => of(error))
    );
  }

  updateUser(user: User) {
    return this.users.doc(user.id).set(user)
      .catch(error => error);
  }
}
