import {ParseText} from './parse-text';
import {WordCount} from '../entities/word-count';

function createParseText(): ParseText {
  return new ParseText();
}

describe('Parse Text', () => {
  it('should return empty list on empty string passed', () => {
    const parseText: ParseText = createParseText();
    expect(parseText.parse('')).toEqual([]);
  });
  it('should return list with one WordCount on string when one word passed', () => {
    const parseText: ParseText = createParseText();
    const res = parseText.parse('sea');
    expect(res.length).toBe(1);
    expect(res[0].word.text).toBe('sea');
    expect(res[0].count).toBe(1);
  });
  it('should return list with two WordCount when two words passed', () => {
    const parseText: ParseText = createParseText();
    const res = parseText.parse('sea salt');
    expect(res.length).toBe(2);
    expect(res[0].word.text).toBe('sea');
    expect(res[1].word.text).toBe('salt');
  });
  it('should return list with one WordCount when one word typed twice passed', () => {
    const parseText: ParseText = createParseText();
    const res = parseText.parse('buffalo buffalo');
    expect(res.length).toBe(1);
    expect(res[0].word.text).toBe('buffalo');
    expect(res[0].count).toBe(2);
  });
  it('should return list with one WordCount with count 3 when one word typed three times passed', () => {
    const parseText: ParseText = createParseText();
    const res = parseText.parse('police police police');
    expect(res.length).toBe(1);
    expect(res[0].word.text).toBe('police');
    expect(res[0].count).toBe(3);
  });
  it('should return list with two WordCount where word "second" goes first when "test second second" passed', () => {
    const parseText: ParseText = createParseText();
    const res = parseText.parse('test second second');
    expect(res.length).toBe(2);
    expect(res[0].word.text).toBe('second');
    expect(res[0].count).toBe(2);
  });
});
