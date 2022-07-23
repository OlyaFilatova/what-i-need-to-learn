export class ParseGrammarStructures {
    private static grammarString = this.createGrammarString();

    public static removeCommonGrammar(text: string) {
        const removeCommonGrammar = new RegExp(this.grammarString, 'g');

        while (removeCommonGrammar.exec(text)) {
            text = text.replace(removeCommonGrammar, ' ');
        }

        return text;
    }

    private static createGrammarString() {
        const grammarArray = [
            "would've",
            "shouldn't",
            'oy',
            'eh',
            'ha-ha-ha',
            "why'd",
            'aah',
            'mm',
            'mm-hmm',
            'duh',
            "that'd",
            'uh-huh',
            'ah',
            "what'd",
            'huh',
            'heh',
            'ugh',
            'aw',
            'unh',
            'aww',
            'uh-oh',
            "'cause",
            'ooh',
            'all',
            'hmm',
            "where'd",
            "must've",
            'yep',
            'whoa',
            'another',
            'any',
            'anybody',
            'anyone',
            'anything',
            'as',
            'aught',
            'both',
            'each',
            'each other',
            'either',
            'enough',
            'everybody',
            'everyone',
            'everything',
            'few',
            'he',
            'her',
            'hers',
            'herself',
            'him',
            'himself',
            'his',
            'i',
            'idem',
            'it',
            'its',
            'itself',
            'many',
            'me',
            'mine',
            'most',
            'my',
            'myself',
            'naught',
            'neither',
            'no one',
            'nobody',
            'none',
            'nothing',
            'nought',
            'one',
            'one another',
            'other',
            'others',
            'ought',
            'our',
            'ours',
            'ourself',
            'ourselves',
            'several',
            'she',
            'some',
            'somebody',
            'someone',
            'something',
            'somewhat',
            'such',
            'suchlike',
            'that',
            'thee',
            'their',
            'theirs',
            'theirself',
            'theirselves',
            'them',
            'themself',
            'themselves',
            'here',
            'there',
            'these',
            'they',
            'thine',
            'this',
            'those',
            'thou',
            'thy',
            'thyself',
            'us',
            'we',
            'what',
            'whatever',
            'whatnot',
            'whatsoever',
            'whence',
            'where',
            'whereby',
            'wherefrom',
            'wherein',
            'whereinto',
            'whereof',
            'whereon',
            'wherever',
            'wheresoever',
            'whereto',
            'whereunto',
            'wherewith',
            'wherewithal',
            'whether',
            'which',
            'whichever',
            'whichsoever',
            'who',
            'whoever',
            'whom',
            'whomever',
            'whomso',
            'whomsoever',
            'whose',
            'whosever',
            'whosesoever',
            'whoso',
            'whosoever',
            'ye',
            'yon',
            'yonder',
            'you',
            'your',
            'yours',
            'yourself',
            'yourselves',
            'aboard',
            'about',
            'above',
            'across',
            'after',
            'against',
            'along',
            'amid',
            'among',
            'around',
            'as',
            'at',
            'before',
            'behind',
            'below',
            'beneath',
            'beside',
            'between',
            'beyond',
            'but',
            'by',
            'concerning',
            'considering',
            'despite',
            'down',
            'during',
            'except',
            'following',
            'for',
            'from',
            'in',
            'inside',
            'into',
            'like',
            'minus',
            'near',
            'next',
            'of',
            'off',
            'on',
            'onto',
            'opposite',
            'out',
            'outside',
            'over',
            'past',
            'per',
            'plus',
            'regarding',
            'round',
            'save',
            'since',
            'than',
            'through',
            'till',
            'to',
            'toward',
            'under',
            'underneath',
            'unlike',
            'until',
            'up',
            'upon',
            'versus',
            'via',
            'with',
            'within',
            'without',
            'aboard',
            'about',
            'above',
            'across',
            'after',
            'against',
            'ahead of',
            'along',
            'amid',
            'amidst',
            'among',
            'around',
            'as',
            'as far as',
            'as of',
            'aside from',
            'at',
            'athwart',
            'atop',
            'barring',
            'because of',
            'before',
            'behind',
            'below',
            'beneath',
            'beside',
            'besides',
            'between',
            'beyond',
            'but',
            'by',
            'by means of',
            'circa',
            'concerning',
            'despite',
            'down',
            'during',
            'except',
            'except for',
            'excluding',
            'far from',
            'following',
            'for',
            'from',
            'in',
            'in accordance with',
            'in addition to',
            'in case of',
            'in front of',
            'in lieu of',
            'in place of',
            'in spite of',
            'including',
            'inside',
            'instead',
            'like',
            'minus',
            'near',
            'next to',
            'notwithstanding',
            'of',
            'off',
            'on',
            'on account of',
            'on behalf of',
            'on top of',
            'onto',
            'opposite',
            'out',
            'out of',
            'outside',
            'over',
            'past',
            'plus',
            'prior to',
            'regarding',
            'regardless of',
            'save',
            'since',
            'than',
            'through',
            'throughout',
            'till',
            'to',
            'toward',
            'towards',
            'under',
            'underneath',
            'unlike',
            'until',
            'up',
            'upon',
            'versus',
            'via',
            'with',
            'with regard to',
            'within',
            'without',
            'though',
            'although',
            'even though',
            'while',
            'if',
            'else',
            'only if',
            'unless',
            'until',
            'provided that',
            'assuming that',
            'even if',
            'in case',
            'lest',
            'than',
            'rather than',
            'whether',
            'as much as',
            'whereas',
            'after',
            'as long as',
            'as soon as',
            'before',
            'by the time',
            'now that',
            'once',
            'since',
            'till',
            'until',
            'when',
            'whenever',
            'while',
            'because',
            'since',
            'so that',
            'in order',
            'why',
            'that',
            'what',
            'whatever',
            'which',
            'whichever',
            'who',
            'whoever',
            'whom',
            'whomever',
            'whose',
            'how',
            'as though',
            'as if',
            'where',
            'wherever',
            'also',
            'besides',
            'furthermore',
            'likewise',
            'moreover',
            'however',
            'nevertheless',
            'nonetheless',
            'still',
            'conversely',
            'instead',
            'otherwise',
            'rather',
            'accordingly',
            'consequently',
            'hence',
            'meanwhile',
            'then',
            'therefore',
            'thus',
            'and',
            'or',
            'am',
            'be',
            'is',
            'are',
            "aren't",
            'were',
            'was',
            'the',
            'have',
            'was',
            'not',
            "i'm",
            "hadn't",
            "don't",
            'how',
            "it's",
            'can',
            'may',
            'must',
            'shall',
            'will',
            'could',
            'might',
            'should',
            'would',
            "wouldn't",
            "you're",
            "that's",
            "we're",
            'gonna',
            'has',
            "what's",
            'did',
            'does',
            'do',
            'done',
            "can't",
            'had',
            'going',
            'been',
            "let's",
            "she's",
            "we'll",
            "she'll",
            "you'll",
            "it'll",
            "i'll",
            'doing',
            "they're",
            "hasn't",
            "haven't",
            "won't",
            "there's",
            "here's",
            'wanna',
            "doesn't",
            "we've",
            "didn't",
            "i've",
            "you've",
            "they've",
            "should've",
            'anywhere',
            "he'd",
            "you'd",
            "who'd",
            "it'd",
            "she'd",
            "they'd",
            "we'd",
            "anyone's",
            'shh',
            "couldn't",
            "they'll",
            "wasn't",
            "i'd",
            "we'd",
            "isn't",
            "one's",
            'sdh',
            'english',
            "how'd",
            'um',
            "weren't",
            "that'll",
            'uh',
            'a',
            'an',
            'oh',
        ];
        return grammarArray.join('|');
    }
}
