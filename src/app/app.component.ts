import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { WordCount } from '../policy/entities/word-count';
import { ParseResult } from '../policy/entities/parse-result';
import { ParseWordsFromText } from '../policy/use-cases/parse-words-from-text';

import { WordStorageService } from './services/word-storage.service';
import { BookStorageService } from './services/book-storage.service';
import { AuthenticationService } from './services/authentication.service';

import { Book } from './models/book.model';
import { TextParsingService } from './services/text-parsing.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    STEPS = {
        knownWords: 2,
        parsedWords_Unique: 18,
        parsedWords_known: 19,
        parseText: 0,
        saveBook: 3,
        savedBooks: 1,
    };

    // vvv Controls
    cleanRootDoublesControl = new FormControl(false);
    textControl = new FormControl('');
    fromTimestampControl = new FormControl('00:00:00');
    toTimestampControl = new FormControl('00:00:00');
    parseType = new FormControl('any');
    titleControl = new FormControl('New Book');
    // ^^^ Controls

    parseRes: ParseResult;

    knownWords;
    knownWordsText = [];

    savedBooks;
    openedBook;

    step = -1;

    uid: string;
    displayName: string;

    constructor(
        public authenticationService: AuthenticationService,
        private wordsStorageService: WordStorageService,
        private booksStorageService: BookStorageService,
        private textParsingService: TextParsingService
    ) {
        this.setupUser();
    }

    private setupUser() {
        this.authenticationService.user$.subscribe((data) => {
            this.uid = data?.uid;
            this.displayName = data?.displayName;
        });
    }

    public loadKnownWords() {
        if (!this.uid) {
            return;
        }

        if (!this.hasKnownWordsLoaded()) {
            this.wordsStorageService.get(this.uid).subscribe((res) => {
                this.setKnownWords(res);
            });
        }
    }

    public loadBooks() {
        if (!this.uid) {
            return;
        }

        if (!this.hasBooksLoaded()) {
            this.booksStorageService.get(this.uid).subscribe((res) => {
                this.savedBooks = res;
            });
        }
    }

    public startParsing() {
        this.openedBook = null;

        this.parseRes = this.textParsingService.parseText(
            this.getTextToParse(),
            this.knownWordsText,
            this.parseType.value,
            this.fromTimestampControl.value,
            this.toTimestampControl.value,
            this.cleanRootDoublesControl.value
        );
    }

    public addToAlreadyKnow($event, word: WordCount) {
        $event.preventDefault();

        this.wordsStorageService
            .add({ text: word.getWord().getText(), uid: this.uid })
            .then(() => this.hideWord(word));
    }

    public removeFromAlreadyKnow($event, word) {
        $event.preventDefault();

        this.wordsStorageService
            .remove(word.getWord ? word.getWord() : word)
            .then(() => this.showWord(word));
    }

    public saveBook() {
        const wordsString = this.textParsingService.createWordsSting(
            this.parseRes.uniqueWordsRes
        );

        this.booksStorageService.checkBookSize(wordsString);

        this.booksStorageService
            .add(this.createBookObject(wordsString))
            .then(() => {});
    }

    public openBook(bookIndex: number) {
        this.openedBook = this.savedBooks[bookIndex];

        this.assureKnownWordsAreLoaded().then(() => this.readBook());
    }

    private async assureKnownWordsAreLoaded() {
        if (this.hasKnownWordsLoaded()) {
            return true;
        }

        const knownWords = await new Promise((resolve) =>
            this.wordsStorageService
                .get(this.uid)
                .subscribe((words) => resolve(words))
        );

        this.setKnownWords(knownWords);
    }

    private readBook() {
        const { text, title, wordsString } = this.openedBook.payload.doc.data();

        this.setBookTitle(title);
        this.setBookText(text);

        this.parseRes = new ParseWordsFromText().separateToKnownAndUnknown(
            this.textParsingService.stringToBookWords(wordsString),
            this.knownWordsText
        );
    }

    private showWord(word: WordCount) {
        word.show = true;
    }

    private hideWord(word: WordCount) {
        word.show = false;
    }

    private createBookObject(wordsString: string): Book {
        return {
            uid: this.uid,
            creator: {
                displayName: this.displayName,
            },
            text: this.getTextToParse(),
            title: this.getTitleForBookToSave(),
            wordsString,
        };
    }

    private hasKnownWordsLoaded() {
        return this.knownWords && this.knownWords.length > 0;
    }

    private hasBooksLoaded() {
        return this.savedBooks && this.savedBooks.length > 0;
    }

    private setKnownWords(words) {
        this.knownWords = words;
        this.knownWordsText = words.map((word) => word.payload.doc.data().text);
    }

    private getTextToParse() {
        return this.textControl.value.toString();
    }

    private getTitleForBookToSave() {
        return this.titleControl.value.toString();
    }

    private setBookTitle(title: string) {
        this.titleControl.setValue(title);
    }

    private setBookText(text: string) {
        this.textControl.setValue(text);
    }
}
