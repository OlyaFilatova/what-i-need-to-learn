import { Component } from '@angular/core';

import {
    createClipboardString,
    ParseWordsFromText,
    WordCount,
} from 'wntl-core';
import { ParseResult } from 'wntl-core';

import { WordStorageService } from '../services/word-storage.service';
import { BookStorageService } from '../services/book-storage.service';
import { AuthenticationService } from '../services/authentication.service';

import { SaveToClipboard } from '../ui/logic/clipboard';
import { TextParsingService } from '../services/text-parsing.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    parseRes: ParseResult = {
        uniqueWordsRes: [],
        knownWords: [],
    };
    textToParse = '';
    uid = '';
    displayName = '';
    knownWordsText: string[] = [];
    isAuthenticated = false;
    bookTitle = 'New Book';
    savedBooks = [];

    STEPS = {
        knownWords: 2,
        parsedWords_Unique: 18,
        parsedWords_known: 19,
        parseText: 0,
        saveBook: 3,
        savedBooks: 1,
    };
    step = -1;

    // -----
    knownWords = [];

    openedBook = null;

    constructor(
        private authenticationService: AuthenticationService,
        private wordsStorageService: WordStorageService,
        private booksStorageService: BookStorageService,
        private textParsingService: TextParsingService
    ) {
        this.setupUser();
    }

    onTextParsed(parseRes) {
        this.parseRes = parseRes;
    }
    onParseStarted() {
        this.openedBook = null;
    }
    onBookSaved() {}
    async openBook(bookIndex: number) {
        // TODO: payload.doc - can we remove it from component code?
        this.openedBook = this.savedBooks[bookIndex].payload.doc.data();

        await this.assureKnownWordsAreLoaded();

        this.readBook();
    }
    async removeFromAlreadyKnow(word) {
        if (word.getWord) {
            throw new Error('Cannot delete WordCount from storage');
        }
        await this.wordsStorageService.remove(word.payload.doc.id);
        this.showWord(word);
    }
    addToAlreadyKnow(word: WordCount) {
        this.wordsStorageService
            .add({ text: word.getWord().getText(), uid: this.uid })
            .then(() => this.hideWord(word));
    }
    signIn() {
        this.authenticationService.googleSignIn();
    }

    // -----
    private setupUser() {
        this.authenticationService.user$.subscribe((data) => {
            this.uid = data?.uid;
            this.displayName = data?.displayName;
            this.isAuthenticated = this.uid ? true : false;
        });
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

    private hasKnownWordsLoaded() {
        return this.knownWords && this.knownWords.length > 0;
    }

    private setKnownWords(words) {
        this.knownWords.splice(0, this.knownWords.length);
        this.knownWords.push(...words);
        // TODO: payload.doc - can we remove it from component code?
        this.knownWordsText.splice(0, this.knownWordsText.length);
        this.knownWordsText.push(
            ...words.map((word) => word.payload.doc.data().text)
        );
    }

    private readBook() {
        const { text, title, wordsString } = this.openedBook;
        this.bookTitle = title;
        this.textToParse = text;
        const uniqueWords =
            this.textParsingService.stringToBookWords(wordsString);
        this.parseRes = new ParseWordsFromText().separateToKnownAndUnknown(
            uniqueWords,
            this.knownWordsText
        );
    }

    private showWord(word: WordCount) {
        word.show = true;
    }

    private hideWord(word: WordCount) {
        word.show = false;
    }

    // -----
    public loadKnownWords() {
        if (this.uid && !this.hasKnownWordsLoaded()) {
            this.wordsStorageService.get(this.uid).subscribe((res) => {
                this.setKnownWords(res);
            });
        }
    }

    public loadBooks() {
        if (this.uid && !this.hasBooksLoaded()) {
            this.booksStorageService.get(this.uid).subscribe((res) => {
                this.savedBooks = res;
            });
        }
    }
    private hasBooksLoaded() {
        return this.savedBooks && this.savedBooks.length > 0;
    }

    // -----
    public copyUniqueWordsToClipboard($event) {
        $event.stopPropagation();

        new SaveToClipboard().copyTextToClipboard(
            createClipboardString(this.parseRes.uniqueWordsRes)
        );
    }

    public copyKnownWordsToClipboard($event) {
        $event.stopPropagation();

        new SaveToClipboard().copyTextToClipboard(
            createClipboardString(this.parseRes.knownWords)
        );
    }
}
