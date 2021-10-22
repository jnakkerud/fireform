import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
export interface User {
    email: string;
    isAnonymous: boolean;
    refreshToken: string;
    uid: string;
}
@Injectable()
export class UserService {

    user: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(authUser => {
            if (authUser) {
                this.user.next((({ email, isAnonymous, refreshToken, uid }) => ({ email, isAnonymous, refreshToken, uid }))(authUser));
            } else {
                this.user.next(null);
            }
        });
    }

    getCurrentUser(): BehaviorSubject<User | null> {
        return this.user;
    }
}
