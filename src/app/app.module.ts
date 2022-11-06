import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { environment } from '../environments/environment';

import { AuthenticationService } from './services/authentication.service';

import { AppComponent } from './components/app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ButtonComponent } from './ui/elements/buttons/button/button.component';
import { HeaderComponent } from './ui/elements/header/header.component';
import { ProjectedDirective } from './ui/elements/projected/projected.directive';
import { BookStorageService } from './services/book-storage.service';
import { WordStorageService } from './services/word-storage.service';
import { InputComponent } from './ui/elements/inputs/input/input.component';
import { BookListComponent } from './components/books-list/book-list.component';
import { KnownWordsComponent } from './components/known-words/known-words.component';
import { KnownWordsCountedComponent } from './components/known-words-counted/known-words-counted.component';
import { ParseTextComponent } from './components/parse-text/parse-text.component';
import { SaveBookComponent } from './components/save-book/save-book.component';
import { UniqueWordsComponent } from './components/unique-words/unique-words.component';

@NgModule({
    declarations: [
        AppComponent,
        UserProfileComponent,
        ButtonComponent,
        HeaderComponent,
        InputComponent,
        ProjectedDirective,
        BookListComponent,
        KnownWordsComponent,
        KnownWordsCountedComponent,
        ParseTextComponent,
        SaveBookComponent,
        UniqueWordsComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatExpansionModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        ScrollingModule,
        RouterModule.forRoot([]),
    ],
    providers: [AuthenticationService, BookStorageService, WordStorageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
