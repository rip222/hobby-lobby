import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject(false);
  userData = new BehaviorSubject(null);
  users: AngularFirestoreCollection<User> = this.db.collection('users');
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
    ) { }

  checkAuthState() {
    this.auth.auth.onAuthStateChanged(user => {
      if (user) {
        this.getUserFromDatabase(user).subscribe(
          data => this.userData.next(data)
        );
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    });
  }

  register(email: string, password: string, name: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        if (data.user) {
          this.createUserInDatabase(name, data.user);
          this.router.navigate(['/']);
        }
      })
      .catch(error => error);
  }
  async login(email: string, password: string) {
    const data = await this.auth.auth.signInWithEmailAndPassword(email, password);
    if (data.user) {
      this.loggedIn.next(true);
      this.getUserFromDatabase(data.user).subscribe(
        user => this.userData.next(user)
      );
      this.router.navigateByUrl('/');
    }
  }

  logout() {
    return this.auth.auth.signOut();
  }

  createUserInDatabase(name: string, u: firebase.User) {
    const user: User = {
      id: u.uid,
      email: u.email,
      name,
      registered: u.metadata.creationTime,
      lastSignIn: u.metadata.lastSignInTime,
      collections: {},
      achievements: {},
      colLikes: {},
      // posts: {},
      experience: 0
    };
    return this.users.doc(user.id).set(user)
      .catch(error => error);
  }

  getUserFromDatabase(u: firebase.User) {
    return this.users.doc(u.uid).get().pipe(
      map(user => {
        // update the last sign in property for front end
        const updUser = {...user.data(), lastSignIn: u.metadata.lastSignInTime};
        return updUser;
      }),
      catchError(error => of(error)),
    );
  }

  updateUserInDataBase(user: User) {
    return this.users.doc(user.id).set(user)
      .catch(error => error);
  }

  changeUserName(name: string) {
    return this.auth.auth.currentUser.updateProfile({displayName: name});
  }

  changeEmail(email: string) {
    return this.auth.auth.currentUser.updateEmail(email);
  }

  changePassword(password: string) {
    return this.auth.auth.currentUser.updatePassword(password);
  }

}
