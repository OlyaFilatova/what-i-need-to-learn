import { Word } from './word.model';

export interface Book {
    uid: string;
    creator: {
        displayName?: string;
    };
    title: string;
    text: string;
    wordsString?: string;

    words?: Word[];
}
