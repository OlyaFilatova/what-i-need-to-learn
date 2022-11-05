import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.auth.user$.pipe(
            take(1),
            map((user) => !!user),
            tap((loggedIn) => {
                if (!loggedIn) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
