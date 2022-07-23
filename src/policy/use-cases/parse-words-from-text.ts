import { WordCount } from '../entities/word-count';
import { Word } from '../entities/word';
import { ParseResult } from '../entities/parse-result';

import { ParseUnique } from './parse-unique';

export class ParseWordsFromText {
    public parse(
        text: string,
        knownWords: string[] = [],
        cleanRootDoubles = false
    ): ParseResult {
        text = this.toSimpleText(text).toLowerCase();
        const textWords = this.toList(text);

        const uniqueWordsRes = this.getUniqueWordsList(
            textWords,
            cleanRootDoubles
        );

        const knownAndUnknownWords = this.separateToKnownAndUnknown(
            uniqueWordsRes,
            knownWords
        );

        return {
            uniqueWordsRes: knownAndUnknownWords.uniqueWordsRes,
            knownWords: knownAndUnknownWords.knownWords,
        };
    }

    protected toSimpleText(text) {
        return this.removeYoutubeTimedTextKeys(text)
            .replaceAll('\\n', ' ')
            .replaceAll(/([^a-zA-Z '-])+/g, ' ')
            .replaceAll(/' /g, ' ')
            .replaceAll(/ '/g, ' ')
            .replaceAll(/- /g, ' ')
            .replaceAll(/ -/g, ' ');
    }

    protected removeYoutubeTimedTextKeys(text) {
        return text
            .replaceAll('wireMagic', ' ')
            .replaceAll('"pens"', ' ')
            .replaceAll('wsWinStyles', ' ')
            .replaceAll('wpWinPositions', ' ')
            .replaceAll('"events"', ' ')
            .replaceAll('"utf8"', ' ')
            .replaceAll('tStartMs', ' ')
            .replaceAll('dDurationMs', ' ')
            .replaceAll('segs', ' ');
    }

    private toList(text) {
        let words = text.split(' ');
        words = words.filter((value) => value !== '');
        return words;
    }

    private getUniqueWordsList(textWords, cleanRootDoubles = false) {
        const uniqueWordsRes = [];
        const uniqueWords = [];
        const wordCounter = {};

        this.countWords(textWords, wordCounter, uniqueWords);

        this.removeDoubles(cleanRootDoubles, wordCounter, uniqueWords);

        this.addWordsToArray(wordCounter, uniqueWordsRes);

        this.sortByText(uniqueWordsRes);

        return uniqueWordsRes;
    }

    private countWords(textWords, wordCounter, uniqueWords) {
        textWords.forEach((word: string) => {
            if (word.length <= 2) {
                return;
            }
            this.addWordToCounter(wordCounter, uniqueWords, word);
            wordCounter[word] += 1;
        });
    }

    private removeDoubles(cleanRootDoubles, wordCounter, uniqueWords) {
        if (cleanRootDoubles) {
            ParseUnique.removeRootDoubles(wordCounter, uniqueWords);
        }
    }

    private addWordsToArray(wordCounter, uniqueWordsRes) {
        Object.keys(wordCounter).forEach((word) => {
            const wordCount = new WordCount(new Word(word));
            wordCount.setCount(wordCounter[word]);
            uniqueWordsRes.push(wordCount);
        });
    }

    private sortByText(uniqueWordsRes) {
        uniqueWordsRes.sort((wc1: WordCount, wc2: WordCount) => {
            if (wc1.getWord().getText() < wc2.getWord().getText()) {
                return -1;
            }
            if (wc1.getWord().getText() > wc2.getWord().getText()) {
                return 1;
            }
            return 0;
        });
    }

    private addWordToCounter(wordCounter, uniqueWords, word) {
        if (!wordCounter.hasOwnProperty(word) && word.length > 2) {
            uniqueWords.push(word);
            wordCounter[word] = 0;
        }
    }

    public separateToKnownAndUnknown(uniqueWordsRes, knownWords) {
        let existingKnownWords = [];
        let unknownWords = [];

        existingKnownWords = uniqueWordsRes.filter(
            (element) => knownWords.indexOf(element.getWord().getText()) !== -1
        );
        unknownWords = uniqueWordsRes.filter(
            (element) => knownWords.indexOf(element.getWord().getText()) === -1
        );

        return {
            uniqueWordsRes: unknownWords,
            knownWords: existingKnownWords,
        };
    }
}
