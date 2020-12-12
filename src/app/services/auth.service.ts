import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export const CODE = {
  USER_NOT_FOUND: 'auth/user-not-found'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminIds = this.db
    .doc<{ ids: string[] }>('config/admin')
    .valueChanges();

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  get user() {
    return this.afAuth.authState;
  }

  isAdmin(id: string) {
    return this.adminIds.pipe(
      map(adminIds => adminIds && adminIds.ids.indexOf(id) > -1)
    );
  }
  signIn(email, password) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }
  create(email, password) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }
  signOut() {
    this.afAuth.auth.signOut();
  }
}
