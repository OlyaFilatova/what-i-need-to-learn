import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
    constructor(public authenticationService: AuthenticationService) {}

    signIn() {
        this.authenticationService.googleSignIn();
    }

    signOut() {
        this.authenticationService.googleSignOut();
    }
}
