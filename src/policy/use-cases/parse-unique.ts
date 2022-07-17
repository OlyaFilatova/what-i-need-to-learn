export class ParseUnique {
    private static availableEndings = [
        '',
        "'",
        "'s",
        "'es",
        'eer',
        'er',
        'est',
        'ion',
        'ity',
        'ment',
        'ness',
        'or',
        'sion',
        'ship',
        'th',
        'able',
        'ible',
        'al',
        'ant',
        'ary',
        'ful',
        'ic',
        'ious',
        'ous',
        'ive',
        'less',
        'y',
        'ed',
        'en',
        'ing',
        'ize',
        'ise',
        'ly',
        'ward',
        'wise',
        'uffix',
        'acy',
        'ance',
        'ence',
        'dom',
        'ism',
        'ist',
        'ty',
        'tion',
        'ate',
        'ify',
        'fy',
        'is',
        'esque',
        'ical',
        'ish',
    ];

    private static immediateEndings = [
        'ism',
        's',
        'ed',
        'er',
        'est',
        'ment',
        'ness',
        'less',
        'ship',
        'able',
        'ing',
        'dom',
        'ize',
        'ise',
        'ish',
    ];

    private static endingChecks: {
        check: (ending: string, word: string, textWords: string[]) => number;
        checkWithout: (
            ending: string,
            word: string,
            textWords: string[]
        ) => number;
    }[] = [
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word + ending),
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(
                    word.replace(new RegExp(ending + '$', 'g'), '')
                ),
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word + ending + 's'),
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(
                    word.replace(new RegExp(ending + 's' + '$', 'g'), '')
                ),
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word + ending + 'es'),
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(
                    word.replace(new RegExp(ending + 'es' + '$', 'g'), '')
                ),
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word.slice(0, -1) + ending),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                -1,
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word.slice(0, -1) + ending + 's'),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                -1,
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word.slice(0, -1) + ending + 'es'),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                -1,
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word + word.slice(-1) + ending),
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(
                    word.replace(new RegExp(ending + '$', 'g'), '').slice(-1)
                ),
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word + word.slice(-1) + ending + 's'),
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(
                    word
                        .replace(new RegExp(ending + 's' + '$', 'g'), '')
                        .slice(-1)
                ),
        },
        {
            check: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(word + word.slice(-1) + ending + 'es'),
            checkWithout: (ending: string, word: string, textWords: string[]) =>
                textWords.indexOf(
                    word
                        .replace(new RegExp(ending + 'es' + '$', 'g'), '')
                        .slice(-1)
                ),
        },
    ];

    private static getWordIndex(word: string, textWords: string[]) {
        for (let i = 0; i < this.availableEndings.length; i++) {
            const ending = this.availableEndings[i];

            for (let j = 0; j < this.endingChecks.length; j++) {
                let index = this.endingChecks[j].check(ending, word, textWords);

                if (index === -1) {
                    index = this.endingChecks[j].checkWithout(
                        ending,
                        word,
                        textWords
                    );
                }

                if (index !== -1) {
                    return index;
                }
            }
        }
        return -1;
    }

    public static isWordPresent(word: string, textWords: string[]) {
        return this.getWordIndex(word, textWords) !== -1;
    }

    public static removeAllWordForms(word: string, textWords: string[]) {
        let deletedCount;
        do {
            deletedCount = textWords.splice(
                this.getWordIndex(word, textWords)
            ).length;
        } while (deletedCount);

        return textWords;
    }

    public static removeRootDoubles(wordCounter, uniqueWords) {
        uniqueWords.forEach((word) => {
            let possibleCopies = [
                ...this.immediateEndings.map(
                    (ending) => word.slice(0, word.length - 1) + ending
                ),
                ...this.immediateEndings.map((ending) => word + ending),
                ...this.immediateEndings.map(
                    (ending) => word + word.slice(-1) + ending
                ),
            ];

            const hasIesEnding = word.slice(word.length - 3) === 'ies';
            const hasIedEnding = word.slice(word.length - 3) === 'ied';

            let alternativeWordToReplaceWith;

            if (hasIesEnding || hasIedEnding) {
                possibleCopies.push(word.slice(0, word.length - 3) + 'y');
            }

            for (const ending of this.immediateEndings) {
                if (word.endsWith(ending)) {
                    alternativeWordToReplaceWith = word.slice(
                        0,
                        word.length - ending.length
                    );
                }
            }

            possibleCopies = Array.from(new Set(possibleCopies));

            if (possibleCopies.includes(alternativeWordToReplaceWith)) {
                possibleCopies.splice(
                    possibleCopies.indexOf(alternativeWordToReplaceWith),
                    1
                );
            }
            if (wordCounter.hasOwnProperty(alternativeWordToReplaceWith)) {
                possibleCopies.push(word);
                word = alternativeWordToReplaceWith;
            }

            let mentionsCount = 0;
            for (const possible of possibleCopies) {
                mentionsCount += this.removeWordWithEnding(
                    wordCounter,
                    possible
                );
            }

            wordCounter[word] += mentionsCount;
        });
    }

    private static removeWordWithEnding(wordCounter, wordWithEnding) {
        let addCount = 0;
        if (wordCounter.hasOwnProperty(wordWithEnding)) {
            addCount = wordCounter[wordWithEnding];
            delete wordCounter[wordWithEnding];
        }
        if (!addCount) {
            addCount = 0;
        }
        return addCount;
    }
}
