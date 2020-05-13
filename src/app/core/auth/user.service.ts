import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { firebase } from '@firebase/app';

export interface User {
    email: string;
    isAnonymous: boolean;
    refreshToken: string;
    uid: string;
}

@Injectable()
export class UserService {

    user: User;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(authUser => {
            // Extract the subset from authUser
            this.user = (({ email, isAnonymous, refreshToken, uid }) => ({ email, isAnonymous, refreshToken, uid }))(authUser);
        });
    }

    getCurrentUser(): Promise<User> {
        return new Promise<User>((resolve) => {
            resolve(this.user);
        });
    }
}
