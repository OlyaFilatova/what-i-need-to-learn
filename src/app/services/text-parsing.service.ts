import { Injectable } from '@angular/core';

import {
    ParseResult,
    ParseWordsFromText,
    ParseWordsFromTimedText,
    ParseStorageString,
} from 'wntl-core';

@Injectable({
    providedIn: 'root',
})
export class TextParsingService {
    wordInfoDelimiter = '__';
    wordsDelimiter = ',';

    parseText(
        text,
        knownWordsText,
        parseType,
        fromTimestamp,
        toTimestamp,
        cleanRootDoubles = false
    ): ParseResult {
        let parser;
        switch (parseType) {
            case 'any':
                parser = new ParseWordsFromText();
                break;
            case 'timedtext':
                parser = new ParseWordsFromTimedText(
                    fromTimestamp,
                    toTimestamp
                );
                break;
            default:
                throw new Error('Parser not found');
        }

        return parser.parse(text, knownWordsText, cleanRootDoubles);
    }

    public createWordsSting(uniqueWords) {
        return new ParseStorageString().createWordsSting(
            uniqueWords,
            this.wordsDelimiter,
            this.wordInfoDelimiter
        );
    }

    public stringToBookWords(wordsString) {
        return new ParseStorageString().stringToBookWords(
            wordsString,
            this.wordsDelimiter,
            this.wordInfoDelimiter
        );
    }
}
