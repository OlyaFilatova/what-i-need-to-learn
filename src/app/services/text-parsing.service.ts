import { Injectable } from '@angular/core';

import { WordCount } from '../../policy/entities/word-count';
import { ParseResult } from '../../policy/entities/parse-result';
import { ParseWordsFromText } from '../../policy/use-cases/parse-words-from-text';
import { ParseWordsFromTimedText } from '../../policy/use-cases/parse-words-from-timed-text';
import { Word } from '../../policy/entities/word';

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

        bookWords.sort((wc1: WordCount, wc2: WordCount) => {
            if (wc1.count > wc2.count) {
                return -1;
            }
            if (wc1.count < wc2.count) {
                return 1;
            }
            return 0;
        });
        return bookWords;
    }
}
