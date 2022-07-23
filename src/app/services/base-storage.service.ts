import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class BaseStorageService<CollectionInputType> {
    protected collectionName: string;

    constructor(protected firestore: AngularFirestore) {}

    add(data: CollectionInputType) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection(this.collectionName)
                .add(data)
                .then(
                    (res) => {
                        resolve(res);
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    }

    remove(data) {
        return this.firestore
            .collection(this.collectionName)
            .doc(data.payload.doc.id)
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
