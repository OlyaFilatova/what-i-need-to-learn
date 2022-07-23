import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { BaseStorageService } from './base-storage.service';

import { BookInput } from '../input/book.input';

@Injectable({
    providedIn: 'root',
})
export class BookStorageService extends BaseStorageService<BookInput> {
    private bookMaxLength = 1048576 / 64;

    constructor(protected firestore: AngularFirestore) {
        super(firestore);

        this.collectionName = 'user-books';
    }

    updateWords(data, newWords) {
        return this.firestore
            .collection(this.collectionName)
            .doc(data.payload.doc.id)
            .set({ wordsString: newWords }, { merge: true });
    }

    public checkBookSize(wordsString: string) {
        if (wordsString.length > this.bookMaxLength) {
            throw new Error('Book size is too big!');
        }
    }
}
