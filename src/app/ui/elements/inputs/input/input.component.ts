import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ui-input',
    templateUrl: './input.component.html',
    styleUrls: [],
})
export class InputComponent {
    @Input()
    control: FormControl;

    @Input()
    label: string;
}
