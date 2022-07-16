import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class WordsService {
    collectionName = 'known-words';
    constructor(private firestore: AngularFirestore) {}
    add(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection(this.collectionName)
                .add(data)
                .then(
                    (res) => {
                        console.log(res);
                        console.log('data has been added');
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    }
    remove(word) {
        return this.firestore
            .collection(this.collectionName)
            .doc(word.payload.doc.id)
            .delete();
    }
    get(uid) {
        return this.firestore
            .collection(this.collectionName, (ref) =>
                ref.where('uid', '==', uid)
            )
            .snapshotChanges();
    }
}
