import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Book } from 'src/app/models/book.model';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { TextParsingService } from 'src/app/services/text-parsing.service';
import { ParseResult } from 'wntl-core';

@Component({
    selector: 'app-save-book',
    templateUrl: './save-book.component.html',
    styleUrls: [],
})
export class SaveBookComponent {
    titleControl = new FormControl('New Book');

    @Input()
    parseRes: ParseResult;

    @Input()
    parsedText: string;

    @Input()
    bookTitle: string;

    @Output()
    bookSaved = new EventEmitter();

    @Input()
    uid: string;

    @Input()
    displayName: string;

    constructor(
        private booksStorageService: BookStorageService,
        private textParsingService: TextParsingService
    ) {}

    public async saveBook() {
        const wordsString = this.textParsingService.createWordsSting(
            this.parseRes.uniqueWordsRes
        );

        this.booksStorageService.checkBookSize(wordsString);

        await this.booksStorageService.add(this.createBookObject(wordsString));

        this.bookSaved.emit();
    }

    private createBookObject(wordsString: string): Book {
        return {
            uid: this.uid,
            creator: {
                displayName: this.displayName,
            },
            text: this.parsedText,
            title: this.titleControl.value.toString(),
            wordsString,
        };
    }
}
