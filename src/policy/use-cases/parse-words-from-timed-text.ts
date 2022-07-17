import { ParseWordsFromText } from './parse-words-from-text';

export class ParseWordsFromTimedText extends ParseWordsFromText {
    private from = 0;
    private to = 0;
    constructor(from: string, to: string) {
        super();

        const [from_hours, from_minutes, from_seconds] = from.split(':');
        const [to_hours, to_minutes, to_seconds] = to.split(':');

        this.from =
            1000 * (+from_seconds + 60 * (+from_minutes + 60 * +from_hours));

        this.to = 1000 * (+to_seconds + 60 * (+to_minutes + 60 * +to_hours));
    }

    protected toSimpleText(text) {
        const json = JSON.parse(text);

        text = json.events
            .filter((el) => el.tStartMs >= this.from && el.tStartMs <= this.to)
            .map((el) => el.segs.map((seg) => seg.utf8).join(' '))
            .join(' ');

        return super.toSimpleText(text);
    }
}
