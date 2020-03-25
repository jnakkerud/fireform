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

    canActivate(): Promise<boolean> {
        return new Promise((resolve) => {
            this.userService.getCurrentUser()
                .then(user => {
                    return resolve(true);
                }, err => {
                    this.router.navigate(['login']);
                    return resolve(false);
                });
        });
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate();
    }
}
