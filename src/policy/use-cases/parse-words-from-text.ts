import { WordCount } from '../entities/word-count';
import { Word } from '../entities/word';
import { ParseResult } from '../entities/parse-result';

import { ParseUnique } from './parse-unique';

export class ParseWordsFromText {
    protected toSimpleText(text) {
        return text
            .replaceAll('wireMagic', ' ')
            .replaceAll('"pens"', ' ')
            .replaceAll('wsWinStyles', ' ')
            .replaceAll('wpWinPositions', ' ')
            .replaceAll('"events"', ' ')
            .replaceAll('"utf8"', ' ')
            .replaceAll('tStartMs', ' ')
            .replaceAll('dDurationMs', ' ')
            .replaceAll('segs', ' ')
            .replaceAll('\\n', ' ')
            .replaceAll(/([^a-zA-Z '-])+/g, ' ')
            .replaceAll(/' /g, ' ')
            .replaceAll(/ '/g, ' ')
            .replaceAll(/- /g, ' ')
            .replaceAll(/ -/g, ' ');
    }

    private toList(text) {
        let words = text.split(' ');
        words = words.filter((value) => value !== '');
        return words;
    }

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

    addWordToCounter(wordCounter, uniqueWords, word) {
        if (!wordCounter.hasOwnProperty(word) && word.length > 2) {
            uniqueWords.push(word);
            wordCounter[word] = 0;
        }
    }

    getUniqueWordsList(textWords, cleanRootDoubles = false) {
        const uniqueWordsRes = [];
        const uniqueWords = [];
        const wordCounter = {};
        textWords.forEach((word: string) => {
            if (word.length <= 2) {
                return;
            }
            this.addWordToCounter(wordCounter, uniqueWords, word);
            wordCounter[word] += 1;
        });
        if (cleanRootDoubles) {
            ParseUnique.removeRootDoubles(wordCounter, uniqueWords);
        }
        Object.keys(wordCounter).forEach((word) => {
            const wordCount = new WordCount(new Word(word));
            wordCount.setCount(wordCounter[word]);
            uniqueWordsRes.push(wordCount);
        });
        uniqueWordsRes.sort((wc1: WordCount, wc2: WordCount) => {
            if (wc1.getWord().getText() < wc2.getWord().getText()) {
                return -1;
            }
            if (wc1.getWord().getText() > wc2.getWord().getText()) {
                return 1;
            }
            return 0;
        });
        return uniqueWordsRes;
    }
}
