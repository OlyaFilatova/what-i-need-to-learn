import {WordCount} from '../entities/word-count';
import {Word} from '../entities/word';

export class ParseText {
  parse(text: string): WordCount[] {
    const res = [];
    let words = text.split(' ');
    words = words.filter((value) => value != '');
    const uniqueWords = [];
    const wordCounter = {};
    words.forEach((word: string) => {
      if (!wordCounter.hasOwnProperty(word)) {
        uniqueWords.push(word);
        wordCounter[word] = 0;
      }
      wordCounter[word] += 1;
    });
    uniqueWords.forEach((word) => {
      const wordCount = new WordCount(new Word(word));
      wordCount.setCount(wordCounter[word]);
      res.push(wordCount);
    });
    res.sort((wc1: WordCount, wc2: WordCount) => {
      if (wc1.count > wc2.count) {
        return -1;
      }
      if (wc1.count < wc2.count) {
        return 1;
      }
      return 0;
    });
    return res;
  }
}
