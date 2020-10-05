import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  constructor(private firestore: AngularFirestore) {
  }
  add(data) {
    /*return new Promise<any>((resolve, reject) => {
      this.firestore.collection('known-words').add(data)
        .then(res => {}, err => reject(err));
    });*/
  }
}
