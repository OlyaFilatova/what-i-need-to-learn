import { Injectable } from '@angular/core';

import { WordCount } from 'wntl-core';
import { ParseResult } from 'wntl-core';
import { ParseWordsFromText } from 'wntl-core';
import { ParseWordsFromTimedText } from 'wntl-core';
import { Word } from 'wntl-core';

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

    public createWordsSting(uniqueWords): string {
        return uniqueWords
            .map(
                (r) =>
                    r.getWord().getText() +
                    this.wordInfoDelimiter +
                    r.getCount()
            )
            .join(this.wordsDelimiter);
    }

    public stringToBookWords(wordsString) {
        const words = wordsString.split(this.wordsDelimiter);
        const bookWords = [];
        words.forEach((value) => {
            const word = value.split(this.wordInfoDelimiter);

            const wordCount = new WordCount(new Word(word[0]));
            wordCount.setCount(word[1]);
            bookWords.push(wordCount);
        });

        bookWords.sort(
            (wc1: WordCount, wc2: WordCount) => wc2.count - wc1.count
        );
        return bookWords;
    }
}
