import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextParsingService } from 'src/app/services/text-parsing.service';

@Component({
    selector: 'app-parse-text',
    templateUrl: './parse-text.component.html',
    styleUrls: [],
})
export class ParseTextComponent {
    @Input()
    knownWordsText: string[];

    @Input()
    text: string;

    @Output()
    textChange = new EventEmitter<string>();

    @Output()
    textParsed = new EventEmitter();

    @Output()
    parseStarted = new EventEmitter();

    cleanRootDoublesControl = new FormControl(false);
    textControl = new FormControl('');
    fromTimestampControl = new FormControl('00:00:00');
    toTimestampControl = new FormControl('00:00:00');
    parseTypeControl = new FormControl('any');

    constructor(private textParsingService: TextParsingService) {}

    public startParsing() {
        this.parseStarted.emit();

        const parseRes = this.textParsingService.parseText(
            this.textControl.value.toString(),
            this.knownWordsText,
            this.parseTypeControl.value,
            this.fromTimestampControl.value,
            this.toTimestampControl.value,
            this.cleanRootDoublesControl.value
        );

        console.log('PARSED', parseRes);

        this.textParsed.emit(parseRes);
    }

    public textChanged() {
        console.log('Text changed');
        this.text = this.textControl.value;
        this.textChange.emit(this.text);
    }
}
