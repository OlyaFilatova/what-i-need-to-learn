import { Book } from '../models/book.model';
import { Word } from '../models/word.model';

export class BookInput implements Book {
    uid: string;
    creator: {
        displayName?: string;
    };
    title: string;
    text: string;
    words?: Word[];
    wordsString?: string;
}
