import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParseWordsFromText } from '../policy/use-cases/parse-words-from-text';
import { ParseWordsFromTimedText } from '../policy/use-cases/parse-words-from-timed-text';
import { WordCount } from '../policy/entities/word-count';
import { Word } from '../policy/entities/word';
import { WordsService } from './services/words.service';
import { AuthenticationService } from './shared/authentication.service';
import { BooksService } from './services/books.service';
import { Book } from './models/book.model';
import { ParseResult } from './models/parse-result';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    cleanRootDoublesControl = new FormControl(false);
    parsed = false;
    textControl = new FormControl('');
    fromTimestampControl = new FormControl('00:00:00');
    toTimestampControl = new FormControl('00:00:00');
    parseType = new FormControl('any');
    titleControl = new FormControl('New Book');
    title = 'what-i-need-to-learn';
    parseRes: ParseResult;
    addToKnown = [];
    knownWords;
    books;
    step = -1;
    book;
    bookWords;
    currentBookIndex = -1;
    kwSubscription;
    wordsCount = 0;

    constructor(
        public authenticationService: AuthenticationService,
        private wordsService: WordsService,
        private booksService: BooksService
    ) {}
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
        this.authenticationService.user$.subscribe((data) => {
            if (data) {
                this.wordsService.get(data.uid).subscribe((res) => {
                    this.knownWords = res;
                });
            }
        });
    }
    getBooks() {
        if (this.books && this.books.length > 0) {
            return;
        }
        this.authenticationService.user$.subscribe((data) => {
            if (data) {
                this.booksService.get(data.uid).subscribe((res) => {
                    this.books = res;
                });
            }
        });
    }

    parseClicked() {
        this.parseRes = null;
        const text = this.getText();
        this.book = null;
        this.parseText(text, this.cleanRootDoublesControl.value);
    }
    parseText(text, cleanRootDoubles = false) {
        if (text.length > 0) {
            const knownWords = [];
            if (this.knownWords) {
                for (const word of this.knownWords) {
                    knownWords.push(word.payload.doc.data().text);
                }
            }
            let parser;
            if (this.parseType.value == 'any') {
                parser = new ParseWordsFromText();
            } else {
                parser = new ParseWordsFromTimedText();
                parser.setTimestamps(
                    this.fromTimestampControl.value,
                    this.toTimestampControl.value
                );
            }
            this.parseRes = parser.parse(text, knownWords, cleanRootDoubles);
            this.parsed = true;
            this.wordsCount = this.parseRes.uniqueWordsRes.length;
        }
    }

    addToAlreadyKnow($event, word: WordCount) {
        $event.preventDefault();
        this.addWordToAlreadyKnow(word.getWord().getText());
        word.show = false;
    }
    addWordToAlreadyKnow(word: string) {
        this.authenticationService.user$.subscribe((data) => {
            if (data) {
                this.wordsService
                    .add({ text: word, uid: data.uid })
                    .then((res) => {
                        console.log(res);
                    });
            }
        });
    }
    stageWordToAlreadyKnow(word: string) {
        this.addToKnown.push(word);
    }
    addWordsToAlreadyKnown() {
        this.addToKnown.forEach((word) => {
            this.addWordToAlreadyKnow(word);
        });
    }

    removeFromAlreadyKnow(word) {
        this.authenticationService.user$.subscribe((data) => {
            if (data) {
                this.wordsService
                    .remove(word.getWord ? word.getWord() : word)
                    .then((res) => {
                        word.show = false;
                    });
            }
        });
    }

    saveBook() {
        this.authenticationService.user$.subscribe((data) => {
            if (data) {
                const wordsList: string[] = [];
                for (const r of this.parseRes.uniqueWordsRes) {
                    wordsList.push(r.getWord().getText() + '__' + r.getCount());
                }
                const book: Book = {
                    uid: data.uid,
                    creator: {
                        displayName: data.displayName,
                    },
                    text: this.getText(),
                    title: this.getTitle(),
                    wordsString: wordsList.join(','),
                };
                const max_length = 1048576 / 64;
                if (book.wordsString.length > max_length) {
                    alert('Book size is too big!');
                    return;
                }
                this.booksService.add(book).then((res) => {
                    console.log(res);
                });
            }
        });
    }

    readBook(i) {
        if (!(this.knownWords && this.knownWords.length > 0)) {
            this.authenticationService.user$.subscribe((data) => {
                if (data) {
                    this.kwSubscription = this.wordsService
                        .get(data.uid)
                        .subscribe((res) => {
                            this.knownWords = res;
                            this.kwSubscription.unsubscribe();
                            this.readBook2(i);
                        });
                }
            });
        } else {
            this.readBook2(i);
        }
    }
    readBook2(i) {
        this.currentBookIndex = i;
        this.book = this.books[i];
        const bookWords = this.stringToBookWords(
            this.book.payload.doc.data().wordsString
        );
        console.log('KNOWN WORDS LENGTH', this.knownWords);
        this.parseRes = new ParseWordsFromText().separateToKnownAndUnknown(
            bookWords,
            this.knownWords.map((word) => word.payload.doc.data().text)
        );
        this.titleControl.setValue(this.book.payload.doc.data().title);
        this.textControl.setValue(this.book.payload.doc.data().text);
        this.parsed = false;
        this.step = 3;
    }
    stringToBookWords(wordsString) {
        const words = wordsString.split(',');
        const bookWords = [];
        words.forEach((value) => {
            const word = value.split('__');

            const wordCount = new WordCount(new Word(word[0]));
            wordCount.setCount(word[1]);
            bookWords.push(wordCount);
        });

        bookWords.sort((wc1: WordCount, wc2: WordCount) => {
            if (wc1.count > wc2.count) {
                return -1;
            }
            if (wc1.count < wc2.count) {
                return 1;
            }
            return 0;
        });
        return bookWords;
    }
    bookWordsToString(bookWords) {
        const words = [];
        bookWords.forEach((value) => {
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
        this.booksService
            .updateWords(this.book, this.bookWordsToString(this.bookWords))
            .then((res) => this.readBook(this.currentBookIndex));
    }
}
