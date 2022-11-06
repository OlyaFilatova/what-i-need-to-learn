import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { BookInput } from '../input/book.input';
import { BookStorage } from 'wntl-storage';

@Injectable({
    providedIn: 'root',
})
export class BookStorageService extends BookStorage<BookInput> {
    constructor(protected firestore: AngularFirestore) {
        super(firestore);
    }
    public checkBookSize(wordsString: string): boolean {
        if (!super.checkBookSize(wordsString)) {
            throw new Error('Book size is too big!');
        }
        return true;
    }
}
