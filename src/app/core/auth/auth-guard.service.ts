import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivate,
    CanActivateChild } from '@angular/router';

import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private afAuth: AngularFireAuth, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            this.isLoggedIn().subscribe(loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(['login']);
                    return resolve(false);
                }
                return resolve(true);
            });
        });
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }

    isLoggedIn(): Observable<boolean> {
        return this.afAuth.authState.pipe(
            take(1),
            map(user => !!user)
        );
    }
}
