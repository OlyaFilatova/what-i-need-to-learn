import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import 'firebase/compat/auth';

import { User } from '../models/user.model';

import { AuthFirebase } from 'wntl-auth';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    user$: Observable<User>;

    constructor(
        private angularFireAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private router: Router
    ) {
        this.user$ = AuthFirebase.setupCurrentUser(this.angularFireAuth).pipe(
            switchMap((user) => {
                if (user) {
                    return this.firestore
                        .doc<User>(`users/${user.uid}`)
                        .valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    async googleSignIn() {
        const user = await AuthFirebase.googleSignIn(this.angularFireAuth);
        return this.updateUserData(user);
    }

    updateUserData(user: User) {
        const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
            `users/${user.uid}`
        );

        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };

        return userRef.set(data, { merge: true });
    }

    async googleSignOut() {
        await AuthFirebase.googleSignOut(this.angularFireAuth);
        return this.router.navigate(['/']);
    }
}
