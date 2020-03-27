import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivate,
    CanActivateChild } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(public userService: UserService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            this.isLoggedIn().then(loggedIn => {
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

    private isLoggedIn(): Promise<boolean> {
        return new Promise((resolve) => {
            this.userService.getCurrentUser()
                .then(user => {
                    if (user?.email) {
                        return resolve(true);
                    }
                    return resolve(false);
                });
        });
    }
}
