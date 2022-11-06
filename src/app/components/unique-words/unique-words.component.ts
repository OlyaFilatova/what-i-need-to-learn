import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-unique-words',
    templateUrl: './unique-words.component.html',
    styleUrls: [],
})
export class UniqueWordsComponent {
    @Input()
    uniqueWordsRes;

    @Output()
    addedToKnown = new EventEmitter();

    @Input()
    isAuthenticated;

    @Output()
    signInClicked = new EventEmitter();

    addToAlreadyKnow($event, word) {
        $event.stopPropagation();

        this.addedToKnown.emit(word);
    }

    signIn() {
        this.signInClicked.emit();
    }
}
