import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ParseWordsFromText} from '../policy/use-cases/parse-words-from-text';
import {WordCount} from '../policy/entities/word-count';
import {Word} from '../policy/entities/word';
import {WordsService} from './services/words.service';
import {AuthenticationService} from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  textControl = new FormControl('');
  title = 'what-i-need-to-learn';
  res = [];
  list = [];
  email: string;
  password: string;

  constructor(public authenticationService: AuthenticationService,
              private wordsService: WordsService) {}

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signIn() {
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }

  parseClicked() {
    this.res = [];
    const text = this.textControl.value.toString();
    if (text.length > 0) {
      const parseRes: WordCount[] = (new ParseWordsFromText()).parse(text);
      let p: WordCount;
      for (let i = 0; i < parseRes.length; i ++) {
        p = parseRes[i];
        this.res.push(p); // p.getWord().getText() + ' ' + p.getCount()
      }
    }
  }
  addToList(word: Word) {
    this.list.push(word);
  }
  addToAlreadyKnow(word: Word) {
    /*this.wordsService.add({text: word.getText()}).then(res => {
      console.log(res);
    });*/
  }
}
