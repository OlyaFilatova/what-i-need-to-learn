import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ui-button',
    templateUrl: './button.component.html',
    styleUrls: [],
})
export class ButtonComponent {
    @Output()
    click = new EventEmitter<any>();

    onClick(event) {
        this.click.emit(event);
    }
}
