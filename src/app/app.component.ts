import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ParseWordsFromText} from '../policy/use-cases/parse-words-from-text';
import {WordCount} from '../policy/entities/word-count';
import {Word} from '../policy/entities/word';
import {WordsService} from './services/words.service';
import {AuthenticationService} from './shared/authentication.service';
import {BooksService} from './services/books.service';
import {Book} from './models/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textControl = new FormControl('');
  titleControl = new FormControl('New Book');
  title = 'what-i-need-to-learn';
  res: string[] = [];
  bookOneWords: string[] = [];
  uniqueWordsRes: WordCount[] = [];
  bookTwoWords: string[] = [];
  bookThreeWords: string[] = [];
  bookFourWords: string[] = [];
  bookFiveWords: string[] = [];
  bookSixWords: string[] = [];
  irregularVerbs: string[] = [];
  englishDomElementary: string[] = [];
  englishDomPreIntermidiate: string[] = [];
  englishDomIntermidiate: string[] = [];
  englishDomUpperIntermidiate: string[] = [];
  englishDomNative: string[] = [];
  englishDomIelts: string[] = [];
  book504: string[] = [];
  addToKnown = [];
  knownWords;
  books;
  step = -1;
  book;
  bookWords;
  currentBookIndex = -1;

  wordsCount = 0;

  constructor(public authenticationService: AuthenticationService,
              private wordsService: WordsService,
              private booksService: BooksService) {
  }
  getText() {
    return this.textControl.value.toString();
  }
  getTitle() {
    return this.titleControl.value.toString();
  }
  getKnownWords() {
    if (this.knownWords && this.knownWords.length > 0) {
      return;
    }
    /*this.authenticationService.user$.subscribe(data => {
      if (data) {
        this.wordsService.get(data.uid).subscribe(res => {
          this.knownWords = res;
          console.log(res);
        });
      }
    });*/
  }
  getBooks() {
    if (this.books && this.books.length > 0) {
      return;
    }
    /*this.authenticationService.user$.subscribe(data => {
      if (data) {
        this.booksService.get(data.uid).subscribe(res => {
          this.books = res;
          console.log(res);
        });
      }
    });*/
  }

  parseClicked() {
    this.uniqueWordsRes = [];
    this.res = [];
    this.bookOneWords = [];
    this.bookTwoWords = [];
    this.bookThreeWords = [];
    this.bookFourWords = [];
    this.bookFiveWords = [];
    this.bookSixWords = [];
    this.irregularVerbs = [];
    this.englishDomElementary = [];
    this.englishDomPreIntermidiate = [];
    this.englishDomIntermidiate = [];
    this.englishDomUpperIntermidiate = [];
    this.englishDomNative = [];
    this.englishDomIelts = [];
    this.book504 = [];
    const text = this.getText();
    this.book = null;
    this.parseText(text);
  }
  parseText(text) {
    if (text.length > 0) {
      const knownWords = [];
      if (this.knownWords) {
        for (const word of this.knownWords) {
          knownWords.push(word.payload.doc.data().text);
        }
      }
      const parseRes: {
        uniqueWordsRes: WordCount[],
        otherWords: string[],
        bookOneWords: string[],
        bookTwoWords: string[],
        bookThreeWords: string[],
        bookFourWords: string[],
        bookFiveWords: string[],
        bookSixWords: string[],
        irregularVerbs: string[],
        englishDomElementary: string[],
        englishDomPreIntermidiate: string[],
        englishDomIntermidiate: string[],
        englishDomUpperIntermidiate: string[],
        englishDomNative: string[],
        book504: string[],
        englishDomIelts: string[]
      } = (new ParseWordsFromText()).parse(text, knownWords);
      this.wordsCount = parseRes.uniqueWordsRes.length;
      let p: string;
      for (let i = 0; i < parseRes.otherWords.length; i ++) {
        p = parseRes.otherWords[i];
        this.res.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }

      for (let i = 0; i < parseRes.irregularVerbs.length; i ++) {
        p = parseRes.irregularVerbs[i];
        this.irregularVerbs.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.bookOneWords.length; i ++) {
        p = parseRes.bookOneWords[i];
        this.bookOneWords.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      let w: WordCount = null;
      for (let i = 0; i < parseRes.uniqueWordsRes.length; i ++) {
        w = parseRes.uniqueWordsRes[i];
        this.uniqueWordsRes.push(w); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.bookTwoWords.length; i ++) {
        p = parseRes.bookTwoWords[i];
        this.bookTwoWords.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.bookThreeWords.length; i ++) {
        p = parseRes.bookThreeWords[i];
        this.bookThreeWords.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.bookFourWords.length; i ++) {
        p = parseRes.bookFourWords[i];
        this.bookFourWords.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.bookFiveWords.length; i ++) {
        p = parseRes.bookFiveWords[i];
        this.bookFiveWords.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.bookSixWords.length; i ++) {
        p = parseRes.bookSixWords[i];
        this.bookSixWords.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.englishDomElementary.length; i ++) {
        p = parseRes.englishDomElementary[i];
        this.englishDomElementary.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.englishDomPreIntermidiate.length; i ++) {
        p = parseRes.englishDomPreIntermidiate[i];
        this.englishDomPreIntermidiate.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }

      for (let i = 0; i < parseRes.englishDomIntermidiate.length; i ++) {
        p = parseRes.englishDomIntermidiate[i];
        this.englishDomIntermidiate.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.englishDomUpperIntermidiate.length; i ++) {
        p = parseRes.englishDomUpperIntermidiate[i];
        this.englishDomUpperIntermidiate.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.englishDomNative.length; i ++) {
        p = parseRes.englishDomNative[i];
        this.englishDomNative.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.englishDomIelts.length; i ++) {
        p = parseRes.englishDomIelts[i];
        this.englishDomIelts.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
      for (let i = 0; i < parseRes.book504.length; i ++) {
        p = parseRes.book504[i];
        this.book504.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
    }
  }

  addToAlreadyKnow($event, word: Word) {
    $event.preventDefault();
    this.addWordToAlreadyKnow(word.getText());
  }
  addWordToAlreadyKnow(word: string) {
    /*this.authenticationService.user$.subscribe(data => {
      if (data) {
        this.wordsService.add({text: word, uid: data.uid}).then(res => {
          console.log(res);
        });
      }
    });*/
  }
  stageWordToAlreadyKnow(word: string) {
    this.addToKnown.push(word);
  }
  addWordsToAlreadyKnown() {
    this.addToKnown.forEach(word => {
      this.addWordToAlreadyKnow(word);
    });
  }

  removeFromAlreadyKnow(word) {
    /*this.authenticationService.user$.subscribe(data => {
      if (data) {
        this.wordsService.remove(word).then(res => {
          console.log(res);
        });
      }
    });*/
  }

  saveBook() {
    /*this.authenticationService.user$.subscribe(data => {
      if (data) {
        const wordsList: string[] = [];
        for (const r of this.res) {
          wordsList.push(r.getWord().getText() + '__' + r.getCount());
        }
        const book: Book = {
          uid: data.uid,
          creator: {
            displayName: data.displayName
          },
          text: this.getText(),
          title: this.getTitle(),
          wordsString: wordsList.join(',')
        };
        this.booksService.add(book).then(res => {
          console.log(res);
        });
      }
    });*/
  }

  readBook(i) {
    this.currentBookIndex = i;
    this.book = this.books[i];
    this.bookWords = this.stringToBookWords(this.book.payload.doc.data().wordsString);
    this.titleControl.setValue(this.book.payload.doc.data().title);
    this.textControl.setValue(this.book.payload.doc.data().text);
    this.res = [];
    this.bookOneWords = [];
    this.uniqueWordsRes = [];
    this.bookTwoWords = [];
    this.bookThreeWords = [];
    this.bookFourWords = [];
    this.bookFiveWords = [];
    this.bookSixWords = [];
    this.irregularVerbs = [];
    this.englishDomElementary = [];
    this.englishDomPreIntermidiate = [];
    this.englishDomIntermidiate = [];
    this.englishDomUpperIntermidiate = [];
    this.englishDomNative = [];
    this.englishDomIelts = [];
    this.book504 = [];
    this.step = 3;
  }
  stringToBookWords(wordsString) {
    const words = wordsString.split(',');
    const bookWords = [];
    words.forEach(value => {
      const word = value.split('__');
      bookWords.push({
        text: word[0],
        count: word[1]
      });
    });
    return bookWords;
  }
  bookWordsToString(bookWords) {
    const words = [];
    bookWords.forEach(value => {
      const word = value.text + '__' + value.count;
      words.push(word);
    });
    return words.join(',');
  }
  removeFromTheBook($event, i) {
    const word = this.bookWords[i];
    this.bookWords.splice(i, 1);

    this.stageWordToAlreadyKnow(word.text);
  }
  saveBookChanges() {
    this.addWordsToAlreadyKnown();
    this.booksService.updateWords(this.book, this.bookWordsToString(this.bookWords)).then(res => this.readBook(this.currentBookIndex));
  }
}
