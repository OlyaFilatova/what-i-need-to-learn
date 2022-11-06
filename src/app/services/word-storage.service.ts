import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { WordInput } from '../input/word.input';
import { WordStorage } from 'wntl-storage';

@Injectable({
    providedIn: 'root',
})
export class WordStorageService extends WordStorage<WordInput> {
    constructor(protected firestore: AngularFirestore) {
        super(firestore);
    }
}
