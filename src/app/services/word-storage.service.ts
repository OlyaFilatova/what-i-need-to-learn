import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { BaseStorageService } from './base-storage.service';

import { WordInput } from '../input/word.input';

@Injectable({
    providedIn: 'root',
})
export class WordStorageService extends BaseStorageService<WordInput> {
    constructor(protected firestore: AngularFirestore) {
        super(firestore);

        this.collectionName = 'known-words';
    }
}
