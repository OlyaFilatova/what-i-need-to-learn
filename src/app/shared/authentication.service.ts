import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  user$: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router) {
    this.user$ = angularFireAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.signInWithPopup(provider);
    console.log('CREDENTIAL: ', credential);
    return this.updateUserData(credential.user);
  }
  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }
  async googleSignOut() {
    await this.angularFireAuth.signOut();
    return this.router.navigate(['/']);
  }

}
