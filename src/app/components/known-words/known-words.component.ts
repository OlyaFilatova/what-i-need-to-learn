import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WordCount } from 'wntl-core';

@Component({
    selector: 'app-known-words',
    templateUrl: './known-words.component.html',
    styleUrls: [],
})
export class KnownWordsComponent {
    @Input()
    knownWords: WordCount[];

    @Output()
    remove = new EventEmitter();

    public removeFromAlreadyKnow($event, word) {
        $event.preventDefault();

        this.remove.emit(word);
    }
}
