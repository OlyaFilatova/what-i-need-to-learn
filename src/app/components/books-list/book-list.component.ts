import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: [],
})
export class BookListComponent {
    @Input()
    savedBooks;

    @Output()
    bookOpened = new EventEmitter();

    openBook(i: number) {
        this.bookOpened.emit(i);
    }
}
